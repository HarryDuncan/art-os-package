export const EXPLODE_UNIFORMS = {
    defaultUniforms: ["uPosition"],
    customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
};
export const EXPLODE_FUNCTIONS = [];
export const EXPLODE_VARYINGS = [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];
export const DEFAULT_EXPLODE_PARAMETERS = {
    effectDistanceMinLength: 0.9,
    effectStrength: 0.5,
};
