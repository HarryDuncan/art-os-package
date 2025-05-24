import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import { FunctionParameter } from "./types";

export const DEFAULT_VERTEX_PARAMETERS: Partial<FunctionParameter>[] = [
  {
    id: "pointPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    default: true,
  },
];

export const DEFAULT_FRAGMENT_PARAMETERS: Partial<FunctionParameter>[] = [
  {
    id: "fragColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    default: true,
  },
];
