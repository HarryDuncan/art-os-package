import { shaderSafeFloat } from "../../../../../../../../utils/conversion/shaderConversions";
import { ExpandEffectProps } from "../../../../types";
import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";

export const expandTransformation = (expandParameters: ExpandEffectProps) => {
  const { effectStrength } = expandParameters;
  const transformation = `
        // EXPAND VERTEX POSITIONS
        vec3 ${VERTEX_POINT_NAME} = ${VERTEX_POINT_NAME}.xyz;
        vec3 direction = normalize(uCenter - ${VERTEX_POINT_NAME}.xyz);
        ${VERTEX_POINT_NAME}.xyz -= direction * ${shaderSafeFloat(
    effectStrength
  )} * uExpandStrength;
      `;
  return { transformation };
};
