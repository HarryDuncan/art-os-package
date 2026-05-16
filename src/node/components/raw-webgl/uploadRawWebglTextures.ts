import { Asset } from "../../../assets/types";
import { RawWebglTextureBinding } from "../../../config/material/shaders/raw-webgl/types";

export type UploadedRawWebglTexture = {
  uniformId: string;
  texture: WebGLTexture;
  unitIndex: number;
};

export const uploadRawWebglTextures = (
  gl: WebGL2RenderingContext,
  textureBindings: RawWebglTextureBinding[],
  assets: Asset[],
): UploadedRawWebglTexture[] => {
  const uploaded: UploadedRawWebglTexture[] = [];

  textureBindings.forEach((binding, unitIndex) => {
    if (
      binding.relationship === "video" ||
      binding.relationship === "video_stream"
    ) {
      // TODO: implement video / video_stream raw-webgl texture uploads.
      console.warn(
        `raw-webgl texture binding "${binding.uniformId}" with relationship "${binding.relationship}" not implemented`,
      );
      return;
    }

    const asset = assets.find((a) => a.guid === binding.assetId);
    const data = asset?.data;
    if (!asset || !data) {
      console.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} not loaded`,
      );
      return;
    }

    if (!(data instanceof ImageBitmap)) {
      console.warn(
        `raw-webgl texture binding "${binding.uniformId}" - asset ${binding.assetId} data is not an ImageBitmap`,
      );
      return;
    }

    const texture = gl.createTexture();
    if (!texture) {
      console.warn(
        `raw-webgl texture binding "${binding.uniformId}" - gl.createTexture returned null`,
      );
      return;
    }

    gl.activeTexture(gl.TEXTURE0 + unitIndex);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    uploaded.push({
      uniformId: binding.uniformId,
      texture,
      unitIndex,
    });
  });

  return uploaded;
};
