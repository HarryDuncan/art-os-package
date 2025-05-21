import { FRAG_COLOR_NAME } from "../../../../../../../consts";
import { FragmentEffectProps } from "../../fragmentShader.types";

export const overlayPixelColor = (_effectProps: FragmentEffectProps) => {
  return {
    transformation: `${FRAG_COLOR_NAME} = vOverlayPixelColor ;`,
  };
};
