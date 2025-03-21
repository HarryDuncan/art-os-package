"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alienDistort = exports.distortVaryings = exports.distortUniforms = exports.distortFunctions = void 0;
const distortion_1 = require("../../../../shader-properties/functions/distortion/distortion");
const alienTransform_1 = require("./alienTransform");
const distortFunctions = () => [
    { id: "twister", functionDefinition: distortion_1.twisterDistortion },
];
exports.distortFunctions = distortFunctions;
const distortUniforms = () => ({
    defaultUniforms: [],
    customUniforms: [{ id: "uRadius", valueType: "FLOAT", value: 1.5 }],
});
exports.distortUniforms = distortUniforms;
const distortVaryings = () => [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
];
exports.distortVaryings = distortVaryings;
const alienDistort = (previousPointName) => {
    const uniformConfig = (0, exports.distortUniforms)();
    const varyingConfig = (0, exports.distortVaryings)();
    const transformation = (0, alienTransform_1.alienTransform)();
    const requiredFunctions = (0, exports.distortFunctions)();
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.alienDistort = alienDistort;
