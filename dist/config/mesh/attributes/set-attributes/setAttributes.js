"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttributes = void 0;
const three_1 = require("three");
const attribute_functions_1 = require("../attribute.functions");
const RANDOM_ATTRIBUTE_IDS = ["randomAngle", "random", "pointType"];
const INDEX_ATTRIBUTE_IDS = ["pointIndex", "index"];
const RANDOMIZED_ATTRIBUTE_IDS = ["pointDisplay", "signDirection"];
const setAttributes = (bufferGeometry, attributeConfig = []) => {
    const vertexCount = (0, attribute_functions_1.getVerticesCount)(bufferGeometry);
    attributeConfig.forEach(({ id, valueConfig, attributeCount }) => {
        const valueCount = attributeCount !== null && attributeCount !== void 0 ? attributeCount : vertexCount;
        if (checkIds(id, RANDOM_ATTRIBUTE_IDS)) {
            setRandomValues(id, valueCount, bufferGeometry);
        }
        else if (checkIds(id, INDEX_ATTRIBUTE_IDS)) {
            setIndexValues(id, valueCount, bufferGeometry);
        }
        else if (checkIds(id, RANDOMIZED_ATTRIBUTE_IDS)) {
            setRandomizedPercentage(id, valueCount, bufferGeometry, valueConfig);
        }
    });
    return bufferGeometry;
};
exports.setAttributes = setAttributes;
const checkIds = (id, allowedIds) => allowedIds.some((allowedId) => id.indexOf(allowedId) !== -1);
const setIndexValues = (attributeId, vertexCount, bufferGeometry) => {
    const pointIds = new Float32Array(vertexCount);
    pointIds.forEach((_value, index) => {
        pointIds[index] = Number(index.toFixed(1));
    });
    bufferGeometry.setAttribute(attributeId, new three_1.BufferAttribute(pointIds, 1));
};
const setRandomValues = (attributeId, vertexCount, bufferGeometry) => {
    const angles = new Float32Array(vertexCount);
    angles.forEach((_value, index) => {
        angles[index] = Math.random();
    });
    bufferGeometry.setAttribute(attributeId, new three_1.BufferAttribute(angles, 1));
};
const setRandomizedPercentage = (attributeId, vertexCount, bufferGeometry, valueConfig) => {
    const { randomizedPercentage } = valueConfig !== null && valueConfig !== void 0 ? valueConfig : {
        randomizedPercentage: 0.5,
    };
    const randomBool = new Float32Array(vertexCount);
    randomBool.forEach((_value, index) => {
        randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
    });
    bufferGeometry.setAttribute(attributeId, new three_1.BufferAttribute(randomBool, 1));
};
