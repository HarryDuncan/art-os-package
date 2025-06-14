import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../constants/shader.consts";
import { SHADER_PROPERTY_TAGS } from "../../../../shader-properties/uniforms/uniforms.consts";
import { ParameterConfig } from "../../../../buildShader.types";

export const DEFAULT_PHONG_UNIFORMS = [
  {
    id: "uLightPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [10, 10, 10],
  },
  {
    id: "uDiffuseColor",
    tag: [SHADER_PROPERTY_TAGS.COLOR],
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0.2, 0.2, 0.2],
  },
  {
    id: "uLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [1, 1.0, 1.0],
  },
  {
    id: "uAmbientReflection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.75,
  },
  {
    id: "uDiffuseReflection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.9,
  },
  {
    id: "uSpecularReflection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.7,
  },
  {
    id: "uAmbientColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0.82, 0.92, 0.2],
  },
  {
    id: "uMaterialDiffuse",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0.5, 0.5, 0.5],
  },
  {
    id: "uSpecularColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [1.0, 1.0, 1.0],
  },
  {
    id: "uShininess",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 20.3,
  },
] as ParameterConfig[];

export const DEFAULT_PHONG_EFFECT_PROPS = { DEFAULT_PHONG_UNIFORMS };

export const PHONG_REQUIRED_FUNCTIONS = [];
// export const PHONG_VARYINGS = [
//   {
//     id: "vEye",
//     varyingType: VARYING_TYPES.DEFAULT,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
//   },

//   {
//     id: "vPosition",
//     varyingType: VARYING_TYPES.DEFAULT,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
//   },
//   {
//     id: "vNormal",
//     varyingType: VARYING_TYPES.DEFAULT,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
//   },
//   {
//     id: "vUv",
//     varyingType: VARYING_TYPES.DEFAULT,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
//   },
//   {
//     id: "vNormalInterpolation",
//     varyingType: VARYING_TYPES.DEFAULT,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
//   },
// ] as VaryingConfig[];
