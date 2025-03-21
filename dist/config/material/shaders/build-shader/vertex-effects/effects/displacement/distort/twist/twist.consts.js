"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWIST_VARYINGS = exports.TWIST_UNIFORM_CONFIG = void 0;
exports.TWIST_UNIFORM_CONFIG = {
    defaultUniforms: [],
    customUniforms: [
        { id: "uDistortAngle", valueType: "FLOAT", value: 1.5 },
        { id: "uDistortStrength", valueType: "FLOAT", value: 1.5 },
    ],
};
exports.TWIST_VARYINGS = [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
        id: "vNormal",
        valueType: "VEC3",
        varyingType: "CUSTOM",
        value: "twistedNormal.xyz",
    },
];
