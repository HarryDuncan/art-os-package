import { shaderSafeFloat } from "utils/conversion/shaderConversions";
import { NoiseEffectProps } from "../../../../types";
import { NOISE_EFFECT_TYPES } from "./noise.consts";

export const noiseTransform = (
  previousPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { declareInTransform } = noiseParameters;
  const vertexPointInstantiation = `vec3 ${pointName} = ${previousPointName}.xyz;`;
  const transformation = `
        // NOISE VERTEX POSITIONS
        ${declareInTransform ? vertexPointInstantiation : ""}
        ${getNoiseTransform(previousPointName, pointName, noiseParameters)}
      `;
  return { vertexPointInstantiation, transformation };
};

const getNoiseTransform = (
  previousPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { effectStrength } = noiseParameters;
  switch (pointName) {
    case NOISE_EFFECT_TYPES.NORMAL:
    default:
      return `
            float offsetX = noise3D(${previousPointName}.xyz + vec3(0.0, 0.0, 0.0) ) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            float offsetY = noise3D(${previousPointName}.xyz + vec3(1.0, 1.0, 1.0)) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            float offsetZ = noise3D(${previousPointName}.xyz + vec3(2.0, 2.0, 2.0)) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            ${pointName} = vec3(${previousPointName}.xyz + vec3(offsetX, offsetY, offsetZ));
          `;
  }
};
