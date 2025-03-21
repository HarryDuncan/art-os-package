import { formatGeometry } from "./geometry/formatGeometry";
import { addMaterials } from "./mesh-materials/addMaterials";
import { setUpMeshes } from "./mesh-setup/setUpMeshes";
import { setUpRandomizedMeshConfigs } from "./randomized/setUpRandomizedMeshConfigs";
import { transformGeometry } from "./geometry/transform-geometries/transformGeometries";
import { multipleMeshes } from "./multiple-meshes/multipleMeshes";
import { setUpAdvancedMeshes } from "./advanced-mesh/setUpAdvancedMeshes";
import { formatMeshAttributes } from "./attributes/formatMeshAttributes";
export const getMeshesFromConfig = (assets, materials, config, attributeConfigs) => {
    var _a;
    const { meshComponentConfigs, advancedMeshConfigs, meshTransforms } = config;
    const meshConfigs = (_a = meshComponentConfigs === null || meshComponentConfigs === void 0 ? void 0 : meshComponentConfigs.filter((meshConfig) => !meshConfig.randomizationConfig)) !== null && _a !== void 0 ? _a : [];
    const randomizedMeshes = setUpRandomizedMeshConfigs(meshComponentConfigs);
    const multipleMeshConfigs = multipleMeshes(meshComponentConfigs);
    const allMeshes = [
        ...meshConfigs,
        ...randomizedMeshes,
        ...multipleMeshConfigs,
    ];
    const formattedGeometry = formatGeometry(assets, allMeshes);
    const meshAttributes = formatMeshAttributes(meshTransforms !== null && meshTransforms !== void 0 ? meshTransforms : [], attributeConfigs);
    const transformedGeometry = transformGeometry(meshAttributes, formattedGeometry);
    const geometriesWithMaterials = addMaterials(transformedGeometry, materials, allMeshes);
    const meshes = setUpMeshes(geometriesWithMaterials);
    const advancedMeshes = setUpAdvancedMeshes(assets, advancedMeshConfigs, materials, meshTransforms, attributeConfigs);
    return [...meshes, ...advancedMeshes];
};
