"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpRandomizedMeshConfigs = void 0;
const getRandomlySpreadCoordinates_1 = require("../../../utils/three-dimension-space/position/getRandomlySpreadCoordinates");
const createBoundingBox_1 = require("../../../utils/three-dimension-space/createBoundingBox");
const getRandomRotation_1 = require("../../../utils/randomize/getRandomRotation");
const setUpRandomizedMeshConfigs = (meshComponentConfigs) => {
    if (!meshComponentConfigs) {
        return [];
    }
    const randomizedMeshes = meshComponentConfigs.flatMap((meshConfig) => {
        return meshConfig.randomizationConfig ? meshConfig : [];
    });
    return randomizedMeshes.flatMap((meshConfig) => {
        return setUpRandom(meshConfig);
    });
};
exports.setUpRandomizedMeshConfigs = setUpRandomizedMeshConfigs;
const setUpRandom = (meshConfig) => {
    const { randomizationConfig, rotation } = meshConfig;
    if (!randomizationConfig) {
        return [];
    }
    const { instanceCount, boundingBoxConfig, randomRotation } = randomizationConfig;
    const boundingBox = (0, createBoundingBox_1.createBoundingBox)(boundingBoxConfig);
    const randomCoordinates = (0, getRandomlySpreadCoordinates_1.generateRandomlySpreadCoordinates)(instanceCount, [boundingBox], [], 2);
    const formattedMeshConfig = randomCoordinates.map((coordinate, index) => {
        const meshRotation = randomRotation
            ? (0, getRandomRotation_1.getRandomRotationAsDegrees)()
            : rotation;
        return Object.assign(Object.assign({}, meshConfig), { id: `${meshConfig.id}-${index}`, position: coordinate, rotation: meshRotation });
    });
    return formattedMeshConfig;
};
