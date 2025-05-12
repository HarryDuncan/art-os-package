import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";
import { UniformValueConfig } from "../../../../../../../../../types";

export const getOverlayPixelColor = (
  uniforms: UniformValueConfig[],
  _pointEffectProps: any
) => {
  return `${FRAG_COLOR_NAME} = vOverlayPixelColor ;`;
};
