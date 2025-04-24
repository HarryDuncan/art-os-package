import { Vector3 } from "three";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../consts/materials/shader.consts";
import {
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../types/materials/shaders/buildShader.types";

export const DEFAULT_FRAG_COLOR_PROPS = {};
export const DEFAULT_COLOR_FUNCTIONS = [];
export const DEFAULT_COLOR_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(0, 0, 0),
    },
  ],
} as UniformConfig;

export const DEFAULT_COLOR_VARYINGS = [] as VaryingConfig[];
