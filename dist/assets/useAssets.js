"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAssets = void 0;
const react_1 = require("react");
const asset_types_1 = require("./asset.types");
const file_1 = require("../utils/file/file");
const loadFont_1 = require("./fonts/loadFont");
const LoadImage_1 = require("./image/load-image/LoadImage");
const loadSvg_1 = require("./svg/loadSvg");
const loadTexture_1 = require("./texture/load-texture/loadTexture");
const LoadModel_1 = require("./geometry/load-model/LoadModel");
const loadAdvancedScene_1 = require("./advanced-scene/loadAdvancedScene");
const useAssets = (assets) => {
    const [areAssetsInitialized, setAreAssetsInitialized] = (0, react_1.useState)(false);
    const [initializedAssets, setInitializedAssets] = (0, react_1.useState)([]);
    function loadAssetData(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAsset = yield loadAsset(asset);
            if (!loadedAsset) {
                console.warn(`asset ${asset.path} not properly loaded`);
            }
            return Object.assign(Object.assign({}, asset), { data: loadedAsset });
        });
    }
    const initializeAssets = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!assets)
            return;
        const loadedAssets = yield Promise.all(assets.flatMap((asset) => __awaiter(void 0, void 0, void 0, function* () { return loadAssetData(asset); })));
        return loadedAssets;
    }), [assets]);
    (0, react_1.useEffect)(() => {
        function getAssets() {
            return __awaiter(this, void 0, void 0, function* () {
                const loadedAssets = yield initializeAssets();
                if (loadedAssets) {
                    setAreAssetsInitialized(true);
                    setInitializedAssets(loadedAssets);
                }
            });
        }
        getAssets();
    }, [assets, initializeAssets]);
    return { initializedAssets, areAssetsInitialized };
};
exports.useAssets = useAssets;
const loadAsset = (asset) => __awaiter(void 0, void 0, void 0, function* () {
    const { assetType, path } = asset;
    const fileType = (0, file_1.getFileTypeFromFilename)(path);
    switch (assetType) {
        case asset_types_1.ASSET_TYPES.MODEL3D: {
            const geometry = yield (0, LoadModel_1.loadModel)(path, fileType);
            return geometry;
        }
        case asset_types_1.ASSET_TYPES.ADVANCED_3D: {
            const advancedScene = yield (0, loadAdvancedScene_1.loadAdvancedScene)(path, fileType);
            return advancedScene;
        }
        case asset_types_1.ASSET_TYPES.TEXTURE: {
            const texture = yield (0, loadTexture_1.loadTexture)(path);
            return texture;
        }
        case asset_types_1.ASSET_TYPES.IMAGE: {
            const image = yield (0, LoadImage_1.loadImage)(path);
            return image;
        }
        case asset_types_1.ASSET_TYPES.VIDEO: {
            return path;
        }
        case asset_types_1.ASSET_TYPES.FONT: {
            const loadedFont = yield (0, loadFont_1.loadFont)(path);
            return loadedFont;
        }
        case asset_types_1.ASSET_TYPES.SVG: {
            const svg = yield (0, loadSvg_1.loadSvg)(path);
            return svg;
        }
        default: {
            return null;
        }
    }
});
