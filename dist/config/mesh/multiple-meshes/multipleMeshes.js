"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleMeshes = void 0;
const createBoundingBox_1 = require("../../../utils/three-dimension-space/createBoundingBox");
const getEquidistantCoordinates_1 = require("../../../utils/three-dimension-space/position/getEquidistantCoordinates");
const position_types_1 = require("../../../utils/three-dimension-space/position/position.types");
const multipleMeshes = (meshComponentConfigs) => {
    if (!meshComponentConfigs) {
        return [];
    }
    const multiMeshes = meshComponentConfigs.flatMap((meshConfig) => {
        return meshConfig.multipleConfig ? meshConfig : [];
    });
    return multiMeshes.flatMap((meshConfig) => {
        return setUpMulti(meshConfig);
    });
};
exports.multipleMeshes = multipleMeshes;
const setUpMulti = (meshConfig) => {
    const { multipleConfig } = meshConfig;
    if (!multipleConfig) {
        return [];
    }
    const { instanceCount, boundingBoxConfig } = multipleConfig;
    const boundingBox = (0, createBoundingBox_1.createBoundingBox)(boundingBoxConfig);
    const spreadCoordinates = (0, getEquidistantCoordinates_1.getEquidistantCoordinates)(instanceCount, boundingBox, position_types_1.AXIS.Y);
    const formattedMeshConfig = spreadCoordinates.map((coordinate, index) => {
        return Object.assign(Object.assign({}, meshConfig), { id: `${meshConfig.id}-${index}`, position: coordinate });
    });
    return formattedMeshConfig;
};
