import {
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import { VARYING_TYPES } from "../../shader-properties/varyings/varyings.consts";

export const TEXTURE_PIXEL_COLOR_PARAMETERS = [
  {
    id: "texturePixelColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: null,
    configLocked: true,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: false,
    isVarying: true,
    isFunctionBased: true,
    varyingConfig: {
      varyingType: VARYING_TYPES.FUNCTION,
    },
    functionConfig: {
      functionId: "getTexturePointColor",
      functionInstantiationParameterMapping: {
        [SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT]:
          SHADER_VARIABLE_TYPES.POSITION,
      },
      outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    },
  },
] as unknown as ParameterConfig[];

const TEXTURE_PIXEL_COLOR_TRANSFORMATION_CONFIG = {
  id: "varyingToValue",
  effectCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = {{texturePixelColor}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as unknown as ShaderTransformationConfig;

export const TEXTURE_PIXEL_COLOR_EFFECT_CONFIG = {
  functions: [],
  parameters: TEXTURE_PIXEL_COLOR_PARAMETERS,
  meshTransformConfig: [],
  transformationConfig: [TEXTURE_PIXEL_COLOR_TRANSFORMATION_CONFIG],
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
};
