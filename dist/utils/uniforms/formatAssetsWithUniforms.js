"use strict";
// links assets to uniforms - using name as the uniform name
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAssetWithUniforms = void 0;
// Must follow the uniform naming convention
const formatAssetWithUniforms = (uniforms, assets) => {
    assets.forEach((asset) => {
        if (asset.name.indexOf("u") === 0) {
            uniforms[asset.name] = { value: asset.data };
        }
        else {
            console.warn(`${asset.name} name does not being with u - naming convention must be followed if being formatted to uniforms`);
        }
    });
};
exports.formatAssetWithUniforms = formatAssetWithUniforms;
