import {
  EffectParameters,
  UniformValueConfig,
} from "../../../../../buildShader.types";
import { FRAG_COLOR_NAME } from "../../../../fragmentEffects.consts";

export const getTexturePixelColor = (
  _uniforms: UniformValueConfig[],
  _effectParameters: EffectParameters
) => {
  return `${FRAG_COLOR_NAME} = vPixelColor;`;
};
