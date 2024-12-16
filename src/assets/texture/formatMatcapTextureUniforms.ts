import { Texture } from "three";

export const formatMatcapTextureUniforms = (
  uniforms: Record<string, unknown>,
  matcapData: Texture
) => ({
  ...uniforms,
  matcap: { value: matcapData },
});
