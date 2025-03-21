import { ShaderPropertyValueTypes } from "../../../constants";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
export const DEFAULT_IMAGE_AS_MASK_PROPS = {};
export const IMAGE_AS_MASK_VARYINGS = [
    {
        id: "vHidePixel",
        varyingType: VARYING_TYPES.CUSTOM,
        valueType: ShaderPropertyValueTypes.FLOAT,
    },
];
export const IMAGE_AS_MASK_FUNCTIONS = [];
export const IMAGE_AS_MASK_ATTRIBUTES = [];
export const IMAGE_AS_MASK_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [],
};
