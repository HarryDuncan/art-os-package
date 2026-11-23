import { Asset } from "../../../assets/types";
import { RawWebglTextureBinding } from "../../../config/material/shaders/raw-webgl/types";
import { packageConsole } from "../../../utils/packageConsole";
import { nextVideoUpload } from "./videoTextureUpload";

// Hands out texture units for the lifetime of a renderer. Every texture
// (still images, videos, and live canvases) keeps its own unit and stays
// bound, so the draw loop never calls gl.activeTexture / gl.bindTexture for
// them. Video entries are the exception that refreshes pixels: the sampler
// unit never changes, only the texels do.
export type RawWebglTextureUnitAllocator = {
  allocate: () => number | null;
};

export const createTextureUnitAllocator = (
  gl: WebGL2RenderingContext,
): RawWebglTextureUnitAllocator => {
  const max = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) as number;
  let next = 0;
  return {
    allocate: () => {
      if (next >= max) {
        packageConsole.warn(
          `raw-webgl: out of texture units (${max}); further textures are skipped`,
        );
        return null;
      }
      const unit = next;
      next += 1;
      return unit;
    },
  };
};

type StoredTexture = {
  texture: WebGLTexture;
  unit: number;
  assetId: string;
  video: HTMLVideoElement | null;
  dirty: boolean;
  allocatedWidth: number;
  allocatedHeight: number;
  frameCallbackId: number | null;
  // False when the browser has no requestVideoFrameCallback. The draw loop
  // then marks the entry dirty itself, and only while the video is playing.
  hasFrameCallback: boolean;
};

export type RawWebglTextureCache = {
  // Unit the binding's asset is bound to, uploading it on first request.
  getUnit: (binding: RawWebglTextureBinding) => number | null;
  // Push any video frames presented since the last call. Still images no-op.
  uploadVideoFrames: () => void;
  dispose: () => void;
};

const TRANSPARENT_PIXEL = new Uint8Array([0, 0, 0, 0]);

// One GPU texture per asset, however many materials sample it.
export const createRawWebglTextureCache = (
  gl: WebGL2RenderingContext,
  assets: Asset[],
  units: RawWebglTextureUnitAllocator,
): RawWebglTextureCache => {
  const byAssetId = new Map<string, StoredTexture | null>();

  const applySamplerParams = () => {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };

  const createEntry = (
    binding: RawWebglTextureBinding,
    video: HTMLVideoElement | null,
  ): StoredTexture | null => {
    const unit = units.allocate();
    if (unit === null) return null;
    const texture = gl.createTexture();
    if (!texture) {
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" - gl.createTexture returned null`,
      );
      return null;
    }
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    applySamplerParams();
    return {
      texture,
      unit,
      assetId: binding.assetId,
      video,
      dirty: false,
      allocatedWidth: 0,
      allocatedHeight: 0,
      frameCallbackId: null,
      hasFrameCallback: false,
    };
  };

  // Fires once per presented frame and re-registers itself. It never touches
  // GL; the render loop uploads on its own tick.
  const watchVideo = (entry: StoredTexture) => {
    const { video } = entry;
    if (!video || typeof video.requestVideoFrameCallback !== "function") return;
    entry.hasFrameCallback = true;
    const schedule = () => {
      entry.frameCallbackId = video.requestVideoFrameCallback(() => {
        entry.dirty = true;
        schedule();
      });
    };
    schedule();
  };

  const upload = (binding: RawWebglTextureBinding): StoredTexture | null => {
    const asset = assets.find((a) => a.guid === binding.assetId);
    const data = asset?.data;
    if (!asset || !data) {
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} not loaded`,
      );
      return null;
    }

    if (data instanceof HTMLVideoElement) {
      const entry = createEntry(binding, data);
      if (!entry) return null;
      // A decoded frame may already be current. allocatedWidth stays 0 so the
      // first upload allocates real storage instead of writing into the 1x1.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        TRANSPARENT_PIXEL,
      );
      entry.dirty = data.readyState >= 2 && data.videoWidth > 0 && !data.paused;
      watchVideo(entry);
      return entry;
    }

    if (binding.relationship === "video" || binding.relationship === "video_stream") {
      // Stream canvases arrive through the live-canvas registry, not here.
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" with relationship "${binding.relationship}" is not an HTMLVideoElement; skipping`,
      );
      return null;
    }

    if (!(data instanceof ImageBitmap)) {
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} data is not an ImageBitmap`,
      );
      return null;
    }

    const entry = createEntry(binding, null);
    if (!entry) return null;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return entry;
  };

  return {
    getUnit: (binding) => {
      if (!byAssetId.has(binding.assetId)) {
        byAssetId.set(binding.assetId, upload(binding));
      }
      return byAssetId.get(binding.assetId)?.unit ?? null;
    },
    uploadVideoFrames: () => {
      let flipped = false;
      byAssetId.forEach((entry) => {
        if (!entry?.video) return;
        if (!entry.hasFrameCallback && !entry.video.paused && !entry.video.ended) {
          entry.dirty = true;
        }
        const action = nextVideoUpload(
          {
            dirty: entry.dirty,
            readyState: entry.video.readyState,
            videoWidth: entry.video.videoWidth,
            videoHeight: entry.video.videoHeight,
            paused: entry.video.paused,
            allocatedWidth: entry.allocatedWidth,
            allocatedHeight: entry.allocatedHeight,
          },
          entry.assetId,
        );
        if (action === "skip") return;
        if (!flipped) {
          // Still images are flipped at decode. Video is not, so flip it here
          // to match, and put the flag back before anything else uploads.
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          flipped = true;
        }
        gl.activeTexture(gl.TEXTURE0 + entry.unit);
        gl.bindTexture(gl.TEXTURE_2D, entry.texture);
        if (action === "allocate") {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            entry.video,
          );
          entry.allocatedWidth = entry.video.videoWidth;
          entry.allocatedHeight = entry.video.videoHeight;
        } else {
          gl.texSubImage2D(
            gl.TEXTURE_2D,
            0,
            0,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            entry.video,
          );
        }
        entry.dirty = false;
      });
      if (flipped) gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    },
    dispose: () => {
      byAssetId.forEach((entry) => {
        if (!entry) return;
        if (entry.video && entry.frameCallbackId !== null) {
          entry.video.cancelVideoFrameCallback(entry.frameCallbackId);
        }
        gl.deleteTexture(entry.texture);
      });
      byAssetId.clear();
    },
  };
};
