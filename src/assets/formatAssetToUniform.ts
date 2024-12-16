import { Asset } from "./asset.types";

export const formatAssetToUniform = (
  assets: Asset[],
  uniforms: Record<string, unknown>
) => {
  assets.forEach((asset) => {
    if (uniforms[asset.name] && asset.data) {
      uniforms[asset.name] = { value: asset.data };
    } else {
      console.warn(`Asset ${asset.name} not associated with a a uniform`);
    }
  });
  return uniforms;
};
