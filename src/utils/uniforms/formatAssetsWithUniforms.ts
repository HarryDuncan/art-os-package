// links assets to uniforms - using name as the uniform name

import { Asset } from "assets/asset.types";

// Must follow the uniform naming convention
export const formatAssetWithUniforms = (
  uniforms: Record<string, unknown>,
  assets: Asset[]
) => {
  assets.forEach((asset) => {
    if (asset.name.indexOf("u") === 0) {
      uniforms[asset.name] = { value: asset.data };
    } else {
      console.warn(
        `${asset.name} name does not being with u - naming convention must be followed if being formatted to uniforms`
      );
    }
  });
};
