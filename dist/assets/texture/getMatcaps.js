"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatcaps = void 0;
const assets_constants_1 = require("../assets.constants");
const getMatcaps = (loadedAssets) => loadedAssets.flatMap((asset) => {
    return asset.name.indexOf(assets_constants_1.MATCAP) !== -1 ? asset : [];
});
exports.getMatcaps = getMatcaps;
