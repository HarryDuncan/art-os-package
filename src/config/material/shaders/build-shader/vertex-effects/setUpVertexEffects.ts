import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_POINT_NAME } from "./vertexEffects.consts";
import {
  ParameterConfig,
  ShaderFunction,
  VertexEffectConfig,
} from "../../../../../types/materials/index";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const { transformations, requiredFunctions, attributeConfigs } =
    getVertexTransformations(vertexEffects);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;

  return {
    transformations,
    requiredFunctions,
    viewMatrix,
    attributeConfigs,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedAttributeConfigs: ParameterConfig[][] = [];
  vertexEffects.forEach((effect) => {
    const vertexEffectData = getVertexEffect(effect);
    if (vertexEffectData !== null) {
      const {
        transformation,
        requiredFunctions,
        attributeConfigs = [],
      } = vertexEffectData ?? {};

      unmergedAttributeConfigs.push(attributeConfigs);
      unmergedTransformations.push(transformation);
      allRequiredFunctions.push(requiredFunctions);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );

  const transformations = unmergedTransformations.join("");
  return {
    transformations,
    requiredFunctions: mergedRequiredFunction,
    attributeConfigs: mergedAttributeConfigs,
  };
};
