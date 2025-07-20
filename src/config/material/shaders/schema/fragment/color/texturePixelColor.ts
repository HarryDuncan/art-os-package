import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  VARYING_TYPES,
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { ParameterConfig, ShaderTransformationSchema } from "../../types";

export const TEXTURE_PIXEL_COLOR_PARAMETERS = [
  {
    key: "texturePixelColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: null,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.VARYING,
    isFunctionBased: true,
    varyingConfig: {
      varyingType: VARYING_TYPES.PARAMETER_FUNCTION,
    },
    functionConfig: {
      functionId: "getTexturePointColor",
      inputMapping: {},
      outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    },
  },
] as unknown as ParameterConfig[];

const TEXTURE_PIXEL_COLOR_TRANSFORMATION_CONFIG = {
  key: "varyingToValue",
  transformCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = {{texturePixelColor}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as unknown as ShaderTransformationSchema;

export const TEXTURE_PIXEL_COLOR = {
  functions: [],
  parameters: TEXTURE_PIXEL_COLOR_PARAMETERS,
  meshTransformIds: [],
  transformSchema: [TEXTURE_PIXEL_COLOR_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
};
