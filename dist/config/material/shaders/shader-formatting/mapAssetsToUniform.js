"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAssetsToUniforms = void 0;
const getCentroid_1 = require("../../../../utils/three-dimension-space/getCentroid");
const three_1 = require("three");
const ASSET_MAPPING_RELATIONSHIPS = {
    TEXTURE: "TEXTURE",
    DIMENSION: "DIMENSION",
    CENTER3D: "CENTER3D",
    VIDEO: "VIDEO",
    VIDEO_STREAM: "VIDEO_STREAM",
};
const mapAssetsToUniforms = (assetMapping, assets, uniforms = {}) => {
    if (assetMapping) {
        assetMapping.forEach((mapping) => {
            const mappedAsset = getMappedAsset(mapping, assets);
            if (mappedAsset) {
                uniforms[mapping.uniform] = { value: mappedAsset };
            }
        });
    }
    return uniforms;
};
exports.mapAssetsToUniforms = mapAssetsToUniforms;
const getMappedAsset = (assetMapping, assets) => {
    const mappedAsset = assets.find((asset) => asset.id === assetMapping.assetId);
    if (mappedAsset && mappedAsset.data) {
        switch (assetMapping.relationship) {
            case ASSET_MAPPING_RELATIONSHIPS.CENTER3D: {
                // @ts-ignore
                const selectedAssetGeometry = mappedAsset.data.children[0].geometry;
                selectedAssetGeometry.computeBoundingBox();
                const box = [
                    selectedAssetGeometry.boundingBox.max,
                    selectedAssetGeometry.boundingBox.min,
                ];
                const centroid = (0, getCentroid_1.getCentroid)(box);
                return centroid;
            }
            case ASSET_MAPPING_RELATIONSHIPS.TEXTURE: {
                const texture = mappedAsset.data;
                return texture;
            }
            case ASSET_MAPPING_RELATIONSHIPS.VIDEO: {
                const video = document.getElementById("video");
                const videoTexture = new three_1.VideoTexture(video);
                videoTexture.minFilter = three_1.LinearFilter;
                videoTexture.magFilter = three_1.LinearFilter;
                videoTexture.format = three_1.RGBFormat;
                return videoTexture;
            }
            case ASSET_MAPPING_RELATIONSHIPS.VIDEO_STREAM: {
                return new three_1.Texture();
            }
            case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
                // @ts-ignore
                const { width, height } = mappedAsset.data.image;
                return new three_1.Vector2(width, height);
            }
            default:
                console.warn(`No configuration for ${assetMapping.relationship}`);
                return null;
        }
    }
    console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
