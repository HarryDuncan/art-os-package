import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_POINT_NAME } from "./vertexEffects.consts";
import {
  ParameterConfig,
  ShaderFunction,
  VaryingConfig,
  VertexEffectConfig,
} from "../../../../../types/materials/index";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const {
    varyingConfigs,
    transformations,
    requiredFunctions,
    attributeConfigs,
  } = getVertexTransformations(vertexEffects);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;

  return {
    varyingConfigs,
    transformations,
    requiredFunctions,
    viewMatrix,
    attributeConfigs,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  const unmergedVaryingConfigs: VaryingConfig[][] = [];
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedAttributeConfigs: ParameterConfig[][] = [];
  vertexEffects.forEach((effect) => {
    const vertexEffectData = getVertexEffect(effect);
    if (vertexEffectData !== null) {
      const {
        varyingConfigs,
        transformation,
        requiredFunctions,
        attributeConfigs = [],
      } = vertexEffectData ?? {};

      unmergedVaryingConfigs.push(varyingConfigs);
      unmergedAttributeConfigs.push(attributeConfigs);
      unmergedTransformations.push(transformation);
      allRequiredFunctions.push(requiredFunctions);
    }
  });

  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );

  const transformations = unmergedTransformations.join("");
  return {
    varyingConfigs: mergedVaryingConfigs,
    transformations,
    requiredFunctions: mergedRequiredFunction,
    attributeConfigs: mergedAttributeConfigs,
  };
};
