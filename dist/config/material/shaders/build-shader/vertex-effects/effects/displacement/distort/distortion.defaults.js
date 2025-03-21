import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
export const DEFAULT_DISTORT_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [],
};
export const DEFAULT_DISTORT_VARYINGS = [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
        id: "vNormal",
        valueType: "VEC3",
        varyingType: "CUSTOM",
        value: "twistedNormal.xyz",
    },
];
export const DEFAULT_DISTORT_FUNCTIONS = [
    { id: "twister", functionDefinition: twisterDistortion },
];
export const DEFAULT_DISTORT_ATTRIBUTES = [];
export const DEFAULT_DISTORTION_EFFECT_PARAMETERS = {};
