import { FRAG_COLOR_NAME } from "../../fragmentEffects.consts";
import { FragmentEffectProps } from "../../fragmentShader.types";

export const texturedPixelColor = (_effectProps: FragmentEffectProps) => {
  const transformation = `${FRAG_COLOR_NAME} = vPixelColor;`;
  return {
    transformation,
  };
};
