"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EXPLODE_PARAMETERS = exports.EXPLODE_VARYINGS = exports.EXPLODE_FUNCTIONS = exports.EXPLODE_UNIFORMS = void 0;
exports.EXPLODE_UNIFORMS = {
    defaultUniforms: ["uPosition"],
    customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
};
exports.EXPLODE_FUNCTIONS = [];
exports.EXPLODE_VARYINGS = [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];
exports.DEFAULT_EXPLODE_PARAMETERS = {
    effectDistanceMinLength: 0.9,
    effectStrength: 0.5,
};
