import { FRAG_COLOR_NAME } from "../fragment-effects/fragmentEffects.consts";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../../../../consts/materials/vertexEffects.consts";

export const MAIN_START = `void main() { `;

export const VERTEX_POINT_INSTANTIATION = `vec4 ${VERTEX_POINT_NAME} = vec4(position.xyz, 1.0);`;
export const VERTEX_NORMAL_INSTANTIATION = `vec4 ${VERTEX_NORMAL_NAME} = vec4(normal.xyz, 1.0);`;
export const MAIN_END = "}";

export const FRAG_COLOR_INSTANTIATION = `vec4 ${FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0);`;
export const POINT_PARENTS = {
  INTERACTIVE: "INTERACTIVE",
  TRIGGERED: "TRIGGERED",
  IMAGE_EFFECT: "IMAGE_EFFECT",
  TRANSITION: "TRANSITION",
  MORPH_TRANSITION: "MORPH_TRANSITION",
};
