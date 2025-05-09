import { PointMaterialFragmentEffectProps } from "../../../../fragmentShader.types";
import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";

export const getOverlayPixelColor = (
  _pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const transformation = `${FRAG_COLOR_NAME} = vOverlayPixelColor ;`;
  return {
    transformation,
  };
};
