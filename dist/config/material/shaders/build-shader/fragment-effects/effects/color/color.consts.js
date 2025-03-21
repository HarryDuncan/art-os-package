import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../constants";
export const DEFAULT_COLOR_EFFECT_PROPS = {};
export const DEFAULT_COLOR_FUNCTIONS = [];
export const DEFAULT_COLOR_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [
        {
            id: "uColor",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(0, 0, 0),
        },
    ],
};
export const DEFAULT_COLOR_VARYINGS = [];
