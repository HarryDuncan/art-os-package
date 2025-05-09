import { PointMaterialFragmentEffectProps } from "../../../../../../../../../types/materials/shaders/fragmentShader.types";
import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";

export const getTexturePixelColor = (
  _pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const transformation = `${FRAG_COLOR_NAME} = vPixelColor;`;
  return {
    transformation,
  };
};
