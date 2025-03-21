"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexFilter = exports.vertexFilterVaryings = exports.vertexFilterUniforms = exports.vertexFilterFunctions = void 0;
const vertexFilterTransformation_1 = require("./vertexFilterTransformation");
const vertexFilterFunctions = () => [];
exports.vertexFilterFunctions = vertexFilterFunctions;
const vertexFilterUniforms = () => ({
    defaultUniforms: [],
    customUniforms: [{ id: "uReduced", valueType: "FLOAT", value: 5.0 }],
});
exports.vertexFilterUniforms = vertexFilterUniforms;
const vertexFilterVaryings = () => [];
exports.vertexFilterVaryings = vertexFilterVaryings;
const vertexFilter = () => {
    const uniformConfig = (0, exports.vertexFilterUniforms)();
    const varyingConfig = (0, exports.vertexFilterVaryings)();
    const transformation = (0, vertexFilterTransformation_1.vertexFilterTransformation)();
    const requiredFunctions = (0, exports.vertexFilterFunctions)();
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.vertexFilter = vertexFilter;
