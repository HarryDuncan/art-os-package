import { VaryingConfig } from "../../../buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";

export const DEFAULT_FRAG_IMAGE_AS_MASK_PROPS = {};

export const IMAGE_AS_MASK_VARYINGS = [
  {
    id: "vHidePixel",
    varyingType: VARYING_TYPES.CUSTOM,

    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
] as VaryingConfig[];

export const IMAGE_AS_MASK_FUNCTIONS = [];

export const IMAGE_AS_MASK_ATTRIBUTES = [];

export const IMAGE_AS_MASK_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [],
};
