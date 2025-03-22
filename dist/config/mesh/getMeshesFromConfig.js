"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeshesFromConfig = void 0;
const formatGeometry_1 = require("./geometry/formatGeometry");
const addMaterials_1 = require("./mesh-materials/addMaterials");
const setUpMeshes_1 = require("./mesh-setup/setUpMeshes");
const setUpRandomizedMeshConfigs_1 = require("./randomized/setUpRandomizedMeshConfigs");
const transformGeometries_1 = require("./geometry/transform-geometries/transformGeometries");
const multipleMeshes_1 = require("./multiple-meshes/multipleMeshes");
const formatMeshAttributes_1 = require("./attributes/formatMeshAttributes");
const getMeshesFromConfig = (assets, materials, config, attributeConfigs) => {
    var _a;
    const { meshComponentConfigs, advancedMeshConfigs, meshTransforms } = config;
    const meshConfigs = (_a = meshComponentConfigs === null || meshComponentConfigs === void 0 ? void 0 : meshComponentConfigs.filter((meshConfig) => !meshConfig.randomizationConfig)) !== null && _a !== void 0 ? _a : [];
    const randomizedMeshes = (0, setUpRandomizedMeshConfigs_1.setUpRandomizedMeshConfigs)(meshComponentConfigs);
    const multipleMeshConfigs = (0, multipleMeshes_1.multipleMeshes)(meshComponentConfigs);
    const allMeshes = [
        ...meshConfigs,
        ...randomizedMeshes,
        ...multipleMeshConfigs,
    ];
    const formattedGeometry = (0, formatGeometry_1.formatGeometry)(assets, allMeshes);
    const meshAttributes = (0, formatMeshAttributes_1.formatMeshAttributes)(meshTransforms !== null && meshTransforms !== void 0 ? meshTransforms : [], attributeConfigs);
    const transformedGeometry = (0, transformGeometries_1.transformGeometry)(meshAttributes, formattedGeometry);
    const geometriesWithMaterials = (0, addMaterials_1.addMaterials)(transformedGeometry, materials, allMeshes);
    const meshes = (0, setUpMeshes_1.setUpMeshes)(geometriesWithMaterials);
    // const advancedMeshes = setUpAdvancedMeshes(
    //   assets,
    //   advancedMeshConfigs,
    //   materials,
    //   meshTransforms,
    //   attributeConfigs
    // ) as unknown as GLTF[];
    return [...meshes];
};
exports.getMeshesFromConfig = getMeshesFromConfig;
