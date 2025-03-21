import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import { simplePerlinNoise } from "../../../shader-properties/functions/noise/perlinNoise";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
export const VANISH_FUNCTIONS = [
    { id: "simplePerlinNoise", functionDefinition: simplePerlinNoise },
];
export const VANISH_UNIFORMS = {
    defaultUniforms: ["uProgress"],
    customUniforms: [
        {
            id: "uNumberOfRings",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 100,
        },
        {
            id: "uSpread",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 0.772,
        },
        {
            id: "uNoise",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 0.18,
        },
        {
            id: "uDisplacement",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 22.0,
        },
    ],
};
export const VANISH_VARYINGS = [
    {
        id: "vPosition",
        varyingType: VARYING_TYPES.DEFAULT,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vNormal",
        varyingType: VARYING_TYPES.DEFAULT,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
];
export const VANISH_ATTRIBUTES = [];
export const DEFAULT_VANISH_EFFECT_PARAMS = {
    vanishHeight: 3.5,
};
