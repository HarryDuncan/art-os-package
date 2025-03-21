export const TWIST_UNIFORM_CONFIG = {
    defaultUniforms: [],
    customUniforms: [
        { id: "uDistortAngle", valueType: "FLOAT", value: 1.5 },
        { id: "uDistortStrength", valueType: "FLOAT", value: 1.5 },
    ],
};
export const TWIST_VARYINGS = [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
        id: "vNormal",
        valueType: "VEC3",
        varyingType: "CUSTOM",
        value: "twistedNormal.xyz",
    },
];
