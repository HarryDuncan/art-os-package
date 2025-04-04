import { PointMaterialFragmentEffectProps } from "../../../../../types";
import { FRAG_COLOR_NAME } from "../../../../fragmentEffects.consts";

export const getOverlayPixelColor = (
  _pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const transformation = `${FRAG_COLOR_NAME} = vOverlayPixelColor ;`;
  return {
    transformation,
  };
};
