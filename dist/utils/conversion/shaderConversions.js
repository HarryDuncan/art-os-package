"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shaderSafeVector4 = exports.shaderSafeVector = exports.shaderSafeFloat = void 0;
const conversion_1 = require("./conversion");
const shaderSafeFloat = (value) => {
    return value.toFixed(2);
};
exports.shaderSafeFloat = shaderSafeFloat;
const shaderSafeVector = (position) => {
    const formattedPositon = (0, conversion_1.positionConfigToPosition)(position);
    return `vec3(${(0, exports.shaderSafeFloat)(formattedPositon.x)}, ${(0, exports.shaderSafeFloat)(formattedPositon.y)}, ${(0, exports.shaderSafeFloat)(formattedPositon.z)})`;
};
exports.shaderSafeVector = shaderSafeVector;
const shaderSafeVector4 = (position, fourthElement = 1) => {
    const formattedPositon = (0, conversion_1.positionConfigToPosition)(position);
    return `vec4(${(0, exports.shaderSafeFloat)(formattedPositon.x)}, ${(0, exports.shaderSafeFloat)(formattedPositon.y)}, ${(0, exports.shaderSafeFloat)(formattedPositon.z)}, ${isVariableName(fourthElement)
        ? fourthElement
        : (0, exports.shaderSafeFloat)(Number(fourthElement))})`;
};
exports.shaderSafeVector4 = shaderSafeVector4;
const isVariableName = (value) => Number.isNaN(Number(value));
