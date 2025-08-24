import {
  SHADER_PROPERTY_TAGS,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../consts";

export const COLOR = {
  key: "color",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: [0, 0, 0, 1],
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  tags: [SHADER_PROPERTY_TAGS.COLOR],
};
