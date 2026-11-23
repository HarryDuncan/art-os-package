import { Asset } from "../../../assets/types";
import { RawWebglTextureBinding } from "../../../config/material/shaders/raw-webgl/types";

import { packageConsole } from "../../../utils/packageConsole";

// Hands out texture units for the lifetime of a renderer. Every texture
// (static images and live canvases) keeps its own unit and stays bound, so
// the draw loop never calls gl.activeTexture / gl.bindTexture for them.
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

export type RawWebglTextureCache = {
  // Unit the binding's asset is bound to, uploading it on first request.
  getUnit: (binding: RawWebglTextureBinding) => number | null;
  dispose: () => void;
};

// One upload per asset, however many materials sample it.
export const createRawWebglTextureCache = (
  gl: WebGL2RenderingContext,
  assets: Asset[],
  units: RawWebglTextureUnitAllocator,
): RawWebglTextureCache => {
  const byAssetId = new Map<string, { texture: WebGLTexture; unit: number } | null>();

  const upload = (binding: RawWebglTextureBinding) => {
    if (
      binding.relationship === "video" ||
      binding.relationship === "video_stream"
    ) {
      // TODO: implement video / video_stream raw-webgl texture uploads.
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" with relationship "${binding.relationship}" not implemented`,
      );
      return null;
    }

    const asset = assets.find((a) => a.guid === binding.assetId);
    const data = asset?.data;
    if (!asset || !data) {
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} not loaded`,
      );
      return null;
    }

    if (!(data instanceof ImageBitmap)) {
      packageConsole.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} data is not an ImageBitmap`,
      );
      return null;
    }

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
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return { texture, unit };
  };

  return {
    getUnit: (binding) => {
      if (!byAssetId.has(binding.assetId)) {
        byAssetId.set(binding.assetId, upload(binding));
      }
      return byAssetId.get(binding.assetId)?.unit ?? null;
    },
    dispose: () => {
      byAssetId.forEach((entry) => {
        if (entry) gl.deleteTexture(entry.texture);
      });
      byAssetId.clear();
    },
  };
};
