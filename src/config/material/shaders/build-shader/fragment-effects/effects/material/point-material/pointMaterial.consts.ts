import { VaryingConfig } from "../../../../buildShader.types";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";

export const DEFAULT_FRAG_POINT_PROPS = {
  isTextured: false,
  defaultPointColor: "#ff1205",
};

export const POINT_MATERIAL_VARYINGS = [
  {
    id: "vPointDisplay",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointDisplay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "vPointType",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointType",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
] as VaryingConfig[];

export const POINT_MATERIAL_FUNCTIONS = [];

export const POINT_MATERIAL_ATTRIBUTES = [];

export const POINT_MATERIAL_UNIFORMS = {
  defaultUniforms: ["uOpacity"],
  customUniforms: [],
};
export const POINT_MATERIAL_PHONG_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uDiffuseColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: "#bf0cf5",
    },
    {
      id: "uLightColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: "#ff00dd",
    },
    {
      id: "uAmbientColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: "#a200fa",
    },
    {
      id: "uDiffuseReflection",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.9,
    },
    {
      id: "uSpecularColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: "#ff00f1",
    },
  ],
};

export const TEXTURED_POINTS_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uPointTexture1",
      valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
      value: null,
      configLocked: true,
      isAssetMapped: true,
    },
    {
      id: "uPointTexture2",
      valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
      value: null,
      configLocked: true,
      isAssetMapped: true,
    },
  ],
};

export const TEXTURED_POINTS_ATTRIBUTES = [
  {
    id: "pointType",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
  },
  {
    id: "pointDisplay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
  },
];
