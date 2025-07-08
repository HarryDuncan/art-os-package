import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../shader.consts";

export const RESOLUTION_UNIFORM = {
  id: "uResolution",
  name: "Resolution",
  description: "The resolution of the screen",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
};
