import { PointMaterialFragmentEffectProps } from "../../../../fragmentShader.types";
import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";
import { UniformValueConfig } from "../../../../../../../../../types";

export const getTexturePixelColor = (
  uniforms: UniformValueConfig[],
  _pointEffectProps: PointMaterialFragmentEffectProps
) => {
  return `${FRAG_COLOR_NAME} = vPixelColor;`;
};
