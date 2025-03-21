"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAssetToUniform = void 0;
const formatAssetToUniform = (assets, uniforms) => {
    assets.forEach((asset) => {
        if (uniforms[asset.id] && asset.data) {
            uniforms[asset.id] = { value: asset.data };
        }
        else {
            console.warn(`Asset ${asset.id} not associated with a a uniform`);
        }
    });
    return uniforms;
};
exports.formatAssetToUniform = formatAssetToUniform;
