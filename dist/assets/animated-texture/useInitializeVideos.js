"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitializeVideos = void 0;
const react_1 = require("react");
const asset_types_1 = require("../asset.types");
const setUpVideo_1 = require("./setUpVideo");
const useInitializeVideos = (loadedAssets, isInitialized = true) => {
    const videoAssets = (0, react_1.useMemo)(() => loadedAssets.flatMap((asset) => asset.assetType === asset_types_1.ASSET_TYPES.VIDEO ? asset : []), [loadedAssets]);
    if (isInitialized) {
        videoAssets.forEach(({ path, name }) => {
            (0, setUpVideo_1.setupVideo)(path, name);
        });
    }
};
exports.useInitializeVideos = useInitializeVideos;
