import { Asset } from "./../types";

export const formatAssetToUniform = (
  assets: Asset[],
  uniforms: Record<string, unknown>
) => {
  assets.forEach((asset) => {
    if (uniforms[asset.id] && asset.data) {
      uniforms[asset.id] = { value: asset.data };
    } else {
      console.warn(`Asset ${asset.id} not associated with a a uniform`);
    }
  });
  return uniforms;
};
