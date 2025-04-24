/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { shaderSafeFloat } from "../../../../../../../../../utils/conversion/shaderConversions";
import { virusNoise } from "../../../../../shader-properties/functions/noise/noise3d";
import { zeroToZeroParabola } from "../../../../../shader-properties/functions/steps/steps";

import { AttributeConfig, NoiseTransitionProps } from "../../../../../types";
import { VERTEX_POINT_NAME } from "../../../../../../../../../consts/materials/vertexEffects.consts";

export const noiseTransitionTransform = (
  noiseTransitionProps: NoiseTransitionProps
) => {
  const { effectStrength, noiseUniformName } = noiseTransitionProps;

  const effectUniforms = {
    defaultUniforms: [],
    customUniforms: [{ id: noiseUniformName, valueType: "FLOAT", value: 1.0 }],
  };
  const effectVaryings = [];

  const effectFunctions = [zeroToZeroParabola, virusNoise];
  const effectAttributes = [] as AttributeConfig[];

  const transformation = `
  ${cloudTransform(effectStrength, noiseUniformName)}
  ${VERTEX_POINT_NAME} = vec4(${VERTEX_POINT_NAME}.xyz + (noiseTransitionPosition * vec3(zeroToZeroParabola(uProgress))), 1.0);`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    VERTEX_POINT_NAME,
    effectFunctions,
    effectAttributes,
  };
};

const cloudTransform = (effectStrength, noiseUniformName) => {
  return `
    vec3 location = vec3(${VERTEX_POINT_NAME}.xyz);
    float pattern = virusNoise(location)  * ${noiseUniformName} * ${shaderSafeFloat(
    effectStrength / 2
  )};
    vec3 distortion = pattern * vec3(clamp(0.23 , 0.23, 0.23));
    vec3 noiseTransitionPosition = ${VERTEX_POINT_NAME}.xyz  * distortion;
    `;
};
