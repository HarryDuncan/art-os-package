import { FRAG_COLOR_NAME } from "../fragment-effects/fragmentEffects.consts";

export const SHADER_TYPES = {
  VERTEX: "VERTEX",
  FRAGMENT: "FRAGMENT",
};
export const MAIN_START = `void main() { `;

export const MAIN_END = "}";

export const FRAG_COLOR_INSTANTIATION = `vec4 ${FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0);`;

export const FUNCTION_TYPES = {
  ROOT: "ROOT",
  SUB_EFFECT: "SUB_EFFECT",
  STATIC: "STATIC",
};
