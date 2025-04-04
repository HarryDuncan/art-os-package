import { PointMaterialFragmentEffectProps } from "../../../../../types";
import { FRAG_COLOR_NAME } from "../../../../fragmentEffects.consts";

export const getTexturePixelColor = (
  _pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const transformation = `${FRAG_COLOR_NAME} = vPixelColor;`;
  return {
    transformation,
  };
};
