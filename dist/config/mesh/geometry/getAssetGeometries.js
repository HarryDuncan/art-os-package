import { FILE_TYPES } from "../../../consts";
import { ASSET_TYPES, } from "../../../assets/asset.types";
import { getFileTypeFromFilename } from "../../../utils/file/file";
export const getAssetGeometries = (assets) => assets.flatMap((asset) => {
    const geometry = getAssetGeometry(asset);
    return geometry && geometry.length
        ? geometry === null || geometry === void 0 ? void 0 : geometry.map((geometryItem) => (Object.assign(Object.assign({}, geometryItem), { assetId: asset.id })))
        : [];
});
export const getAssetGeometry = (asset) => {
    const { assetType, path, data, name } = asset;
    if (assetType !== ASSET_TYPES.MODEL3D || !data) {
        return null;
    }
    const modelFileType = getFileTypeFromFilename(path);
    switch (modelFileType) {
        case FILE_TYPES.MODELS.OBJ:
        case FILE_TYPES.MODELS.GLB:
        case FILE_TYPES.MODELS.GLTF:
            return getObjectGeometries(data, name);
        default:
            console.warn(`no formatting for ${modelFileType}`);
            return null;
    }
};
export const getObjectGeometries = (data, name) => {
    const { children } = data;
    if (children.length) {
        return children.map((child) => ({
            name: child.name,
            geometry: child.geometry,
        }));
    }
    console.warn(`geometry not valid ${name}`);
    return [];
};
export const getAssetBufferGeometry = (asset) => {
    const assetGeometry = getAssetGeometry(asset);
    if (assetGeometry) {
        return assetGeometry[0].geometry;
    }
    console.warn(`no buffer geometry found for ${asset.name}`);
};
