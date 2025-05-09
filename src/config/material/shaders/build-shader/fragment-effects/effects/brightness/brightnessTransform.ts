import { BrightnessFragmentEffectProps } from "../../fragmentShader.types";
import { FRAG_COLOR_NAME } from "../../../../../../../consts";

export const brightnessTransform = (
  brightnessParameters: BrightnessFragmentEffectProps
) => {
  const transformation = `
        // BRIGHTNESS

        ${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * uBrightness;
      `;
  return { transformation };
};
