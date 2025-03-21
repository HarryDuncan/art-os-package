"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetBufferGeometry = exports.getObjectGeometries = exports.getAssetGeometry = exports.getAssetGeometries = void 0;
const consts_1 = require("../../../consts");
const asset_types_1 = require("../../../assets/asset.types");
const file_1 = require("../../../utils/file/file");
const getAssetGeometries = (assets) => assets.flatMap((asset) => {
    const geometry = (0, exports.getAssetGeometry)(asset);
    return geometry && geometry.length
        ? geometry === null || geometry === void 0 ? void 0 : geometry.map((geometryItem) => (Object.assign(Object.assign({}, geometryItem), { assetId: asset.id })))
        : [];
});
exports.getAssetGeometries = getAssetGeometries;
const getAssetGeometry = (asset) => {
    const { assetType, path, data, name } = asset;
    if (assetType !== asset_types_1.ASSET_TYPES.MODEL3D || !data) {
        return null;
    }
    const modelFileType = (0, file_1.getFileTypeFromFilename)(path);
    switch (modelFileType) {
        case consts_1.FILE_TYPES.MODELS.OBJ:
        case consts_1.FILE_TYPES.MODELS.GLB:
        case consts_1.FILE_TYPES.MODELS.GLTF:
            return (0, exports.getObjectGeometries)(data, name);
        default:
            console.warn(`no formatting for ${modelFileType}`);
            return null;
    }
};
exports.getAssetGeometry = getAssetGeometry;
const getObjectGeometries = (data, name) => {
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
exports.getObjectGeometries = getObjectGeometries;
const getAssetBufferGeometry = (asset) => {
    const assetGeometry = (0, exports.getAssetGeometry)(asset);
    if (assetGeometry) {
        return assetGeometry[0].geometry;
    }
    console.warn(`no buffer geometry found for ${asset.name}`);
};
exports.getAssetBufferGeometry = getAssetBufferGeometry;
