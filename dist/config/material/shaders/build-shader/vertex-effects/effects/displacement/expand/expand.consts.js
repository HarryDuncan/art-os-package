export const EXPAND_UNIFORMS = {
    defaultUniforms: ["uCenter"],
    customUniforms: [{ id: "uExpandStrength", valueType: "FLOAT", value: 1.0 }],
};
export const EXPAND_FUNCTIONS = [];
export const EXPAND_VARYINGS = [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];
export const DEFAULT_EXPAND_PARAMETERS = {
    effectDistanceMinLength: 0.9,
    effectStrength: 1.0,
    maxEffectStrength: 1000.0,
};
