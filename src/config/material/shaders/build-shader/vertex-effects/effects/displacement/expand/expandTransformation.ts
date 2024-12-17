import { shaderSafeFloat } from "../../../../../../../../utils/conversion/shaderConversions";
import { ExpandEffectProps } from "../../../../types";

export const expandTransformation = (
  previousPointName: string,
  pointName: string,
  expandParameters: ExpandEffectProps
) => {
  const { effectStrength, declareInTransform } = expandParameters;
  const vertexPointInstantiation = `vec3 ${pointName} = ${previousPointName}.xyz;`;
  const transformation = `
        // EXPAND VERTEX POSITIONS
        ${declareInTransform ? vertexPointInstantiation : ""}
        vec3 direction = normalize(uCenter - ${pointName}.xyz);
        ${pointName}.xyz -= direction * ${shaderSafeFloat(
    effectStrength
  )} * uExpandStrength;
      `;
  return { vertexPointInstantiation, transformation };
};
