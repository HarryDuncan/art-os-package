import { shaderSafeFloat } from "../../../../../../../utils/conversion/shaderConversions";
import { OpacityFragmentEffectProps } from "../../../types";
import { FRAG_COLOR_NAME } from "../../fragmentEffects.consts";

export const opacityTransform = (
  opacityParameters: OpacityFragmentEffectProps
) => {
  const { opacity, asUniform } = opacityParameters;

  const transformation = `
        // OPACITY
        float opacity = ${asUniform ? "uOpacity" : shaderSafeFloat(opacity)};
        ${FRAG_COLOR_NAME} = vec4(${FRAG_COLOR_NAME}.rgb, opacity);
      `;
  return { transformation };
};
