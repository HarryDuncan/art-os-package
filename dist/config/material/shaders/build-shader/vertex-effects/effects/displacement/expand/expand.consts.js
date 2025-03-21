"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EXPAND_PARAMETERS = exports.EXPAND_VARYINGS = exports.EXPAND_FUNCTIONS = exports.EXPAND_UNIFORMS = void 0;
exports.EXPAND_UNIFORMS = {
    defaultUniforms: ["uCenter"],
    customUniforms: [{ id: "uExpandStrength", valueType: "FLOAT", value: 1.0 }],
};
exports.EXPAND_FUNCTIONS = [];
exports.EXPAND_VARYINGS = [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];
exports.DEFAULT_EXPAND_PARAMETERS = {
    effectDistanceMinLength: 0.9,
    effectStrength: 1.0,
    maxEffectStrength: 1000.0,
};
