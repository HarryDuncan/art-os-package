"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureGeometry = exports.formatGeometry = void 0;
const three_1 = require("three");
const geometry_types_1 = require("../../../assets/geometry/geometry.types");
const assets_constants_1 = require("../../../assets/assets.constants");
const getAssetGeometries_1 = require("../../../config/mesh/geometry/getAssetGeometries");
const formatFromConfig_1 = require("../../../utils/three-dimension-space/formatFromConfig");
const mesh_consts_1 = require("../mesh.consts");
const setupCustomBufferGeometry_1 = require("./custom-buffer-geometry/setupCustomBufferGeometry");
const formatGeometry = (loadedAssets, meshComponentConfigs) => {
    const geometries = (0, getAssetGeometries_1.getAssetGeometries)(loadedAssets);
    return meshComponentConfigs.flatMap((meshConfig) => {
        var _a, _b;
        const geometry = getGeometryForMeshConfig(geometries, (_a = meshConfig.geometryId) !== null && _a !== void 0 ? _a : "");
        if (!(geometry === null || geometry === void 0 ? void 0 : geometry.geometry)) {
            return [];
        }
        const position = (0, formatFromConfig_1.formatPositionFromConfig)(meshConfig);
        const rotation = (0, formatFromConfig_1.formatRotationFromConfig)(meshConfig);
        const configuredGeometry = (0, exports.configureGeometry)(geometry.geometry, meshConfig.geometryConfig);
        return {
            geometry: configuredGeometry,
            name: meshConfig.id,
            meshType: (_b = meshConfig.meshType) !== null && _b !== void 0 ? _b : geometry_types_1.MESH_TYPES.MESH,
            position,
            rotation,
            groupId: meshConfig.groupId,
        };
    });
};
exports.formatGeometry = formatGeometry;
const configureGeometry = (geometry, geometryConfig = assets_constants_1.DEFAULT_MODEL3D_CONFIG) => {
    var _a;
    const formattedGeometry = geometry.clone();
    const { scale, centerMesh } = geometryConfig;
    formattedGeometry.scale(scale, scale, scale);
    if (centerMesh) {
        formattedGeometry.center();
    }
    const size = new three_1.Vector3();
    formattedGeometry.computeBoundingBox();
    (_a = formattedGeometry.boundingBox) === null || _a === void 0 ? void 0 : _a.getSize(size);
    return formattedGeometry;
};
exports.configureGeometry = configureGeometry;
const getGeometryForMeshConfig = (geometries, geometryId) => {
    if (mesh_consts_1.CUSTOM_GEOMETRY_TYPES.includes(geometryId)) {
        const customGeometry = (0, setupCustomBufferGeometry_1.setUpCustomBufferGeometry)(geometryId, {});
        return { geometry: customGeometry };
    }
    const meshGeometry = geometries.find((geometry) => 
    // @ts-ignore
    geometry.name === geometryId || geometry.assetId === geometryId);
    if (!meshGeometry) {
        console.warn(`no geometry found for ${geometryId} this mesh will not be rendered
        geometry names ${geometries.map(({ name }) => name)}`);
    }
    return Object.assign(Object.assign({}, meshGeometry), { geometry: meshGeometry === null || meshGeometry === void 0 ? void 0 : meshGeometry.geometry.clone() });
};
