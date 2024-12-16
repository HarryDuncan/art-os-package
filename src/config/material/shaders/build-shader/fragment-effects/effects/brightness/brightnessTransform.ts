import { BrightnessFragmentEffectProps } from "../../../types";

export const brightnessTransform = (
  fragName: string,
  previousFragName: string,
  brightnessParameters: BrightnessFragmentEffectProps
) => {
  const { declareInTransform } = brightnessParameters;
  const fragmentColorInstantiation = `vec4 ${fragName} = ${previousFragName};`;
  const transformation = `
        // BRIGHTNESS
        ${declareInTransform ? fragmentColorInstantiation : ""}
        vec4 brightnessColor = ${fragName} * uBrightness;
        ${fragName} = ${fragName} * brightnessColor;
      `;
  return { fragmentColorInstantiation, transformation };
};
