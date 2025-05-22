import { Vector4 } from "three";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../constants/shader.consts";
import {
  SHADER_PROPERTY_TAGS,
  UniformConfig,
  VaryingConfig,
} from "../../../buildShader.types";

export const DEFAULT_FRAG_COLOR_PROPS = {};
export const DEFAULT_COLOR_FUNCTIONS = [];
export const DEFAULT_COLOR_UNIFORMS = [
  {
    id: "uColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: new Vector4(0, 0, 0, 1),
    configLocked: true,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
] as UniformConfig[];

export const DEFAULT_COLOR_VARYINGS = [] as VaryingConfig[];
