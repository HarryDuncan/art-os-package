import { shaderSafeFloat } from "utils/conversion/shaderConversions";
import { OpacityFragmentEffectProps } from "../../../types";

export const opacityTransform = (
  fragName: string,
  previousFragName: string,
  opacityParameters: OpacityFragmentEffectProps
) => {
  const { opacity, asUniform, declareInTransform } = opacityParameters;
  const fragmentColorInstantiation = `vec4 ${fragName} = ${previousFragName};`;
  const transformation = `
        // OPACITY
        ${declareInTransform ? fragmentColorInstantiation : ""}
        float opacity = ${asUniform ? "uOpacity" : shaderSafeFloat(opacity)};
        ${fragName} = vec4(${previousFragName}.xyz, opacity);
      `;
  return { fragmentColorInstantiation, transformation };
};
