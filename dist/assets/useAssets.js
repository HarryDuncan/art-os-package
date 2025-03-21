var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useState } from "react";
import { ASSET_TYPES } from "./asset.types";
import { getFileTypeFromFilename } from "../utils/file/file";
import { loadFont } from "./fonts/loadFont";
import { loadImage } from "./image/load-image/LoadImage";
import { LoadSvg } from "./svg/loadSvg";
import { loadTexture } from "./texture/load-texture/loadTexture";
import { loadModel } from "./geometry/load-model/LoadModel";
import { loadAdvancedScene } from "./advanced-scene/loadAdvancedScene";
export const useAssets = (assets) => {
    const [areAssetsInitialized, setAreAssetsInitialized] = useState(false);
    const [initializedAssets, setInitializedAssets] = useState([]);
    function loadAssetData(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAsset = yield loadAsset(asset);
            if (!loadedAsset) {
                console.warn(`asset ${asset.path} not properly loaded`);
            }
            return Object.assign(Object.assign({}, asset), { data: loadedAsset });
        });
    }
    const initializeAssets = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!assets)
            return;
        const loadedAssets = yield Promise.all(assets.flatMap((asset) => __awaiter(void 0, void 0, void 0, function* () { return loadAssetData(asset); })));
        return loadedAssets;
    }), [assets]);
    useEffect(() => {
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
const loadAsset = (asset) => __awaiter(void 0, void 0, void 0, function* () {
    const { assetType, path } = asset;
    const fileType = getFileTypeFromFilename(path);
    switch (assetType) {
        case ASSET_TYPES.MODEL3D: {
            const geometry = yield loadModel(path, fileType);
            return geometry;
        }
        case ASSET_TYPES.ADVANCED_3D: {
            const advancedScene = yield loadAdvancedScene(path, fileType);
            return advancedScene;
        }
        case ASSET_TYPES.TEXTURE: {
            const texture = yield loadTexture(path);
            return texture;
        }
        case ASSET_TYPES.IMAGE: {
            const image = yield loadImage(path);
            return image;
        }
        case ASSET_TYPES.VIDEO: {
            return path;
        }
        case ASSET_TYPES.FONT: {
            const loadedFont = yield loadFont(path);
            return loadedFont;
        }
        case ASSET_TYPES.SVG: {
            const svg = yield LoadSvg(path);
            return svg;
        }
        default: {
            return null;
        }
    }
});
