import { Vector3 } from "three";
import { MESH_TYPES, } from "../../../assets/geometry/geometry.types";
import { DEFAULT_MODEL3D_CONFIG } from "../../../assets/assets.constants";
import { getAssetGeometries } from "../../../config/mesh/geometry/getAssetGeometries";
import { formatPositionFromConfig, formatRotationFromConfig, } from "../../../utils/three-dimension-space/formatFromConfig";
import { CUSTOM_GEOMETRY_TYPES } from "../mesh.consts";
import { setUpCustomBufferGeometry } from "./custom-buffer-geometry/setupCustomBufferGeometry";
export const formatGeometry = (loadedAssets, meshComponentConfigs) => {
    const geometries = getAssetGeometries(loadedAssets);
    return meshComponentConfigs.flatMap((meshConfig) => {
        var _a, _b;
        const geometry = getGeometryForMeshConfig(geometries, (_a = meshConfig.geometryId) !== null && _a !== void 0 ? _a : "");
        if (!(geometry === null || geometry === void 0 ? void 0 : geometry.geometry)) {
            return [];
        }
        const position = formatPositionFromConfig(meshConfig);
        const rotation = formatRotationFromConfig(meshConfig);
        const configuredGeometry = configureGeometry(geometry.geometry, meshConfig.geometryConfig);
        return {
            geometry: configuredGeometry,
            name: meshConfig.id,
            meshType: (_b = meshConfig.meshType) !== null && _b !== void 0 ? _b : MESH_TYPES.MESH,
            position,
            rotation,
            groupId: meshConfig.groupId,
        };
    });
};
export const configureGeometry = (geometry, geometryConfig = DEFAULT_MODEL3D_CONFIG) => {
    var _a;
    const formattedGeometry = geometry.clone();
    const { scale, centerMesh } = geometryConfig;
    formattedGeometry.scale(scale, scale, scale);
    if (centerMesh) {
        formattedGeometry.center();
    }
    const size = new Vector3();
    formattedGeometry.computeBoundingBox();
    (_a = formattedGeometry.boundingBox) === null || _a === void 0 ? void 0 : _a.getSize(size);
    return formattedGeometry;
};
const getGeometryForMeshConfig = (geometries, geometryId) => {
    if (CUSTOM_GEOMETRY_TYPES.includes(geometryId)) {
        const customGeometry = setUpCustomBufferGeometry(geometryId, {});
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
