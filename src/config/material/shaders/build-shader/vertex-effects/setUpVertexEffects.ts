import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_POINT_NAME } from "../../../../../consts/materials/vertexEffects.consts";
import { mergeStructConfigs } from "../shader-properties/structs/mergeStructConfigs";
import {
  AttributeConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
  VertexEffectConfig,
} from "../../../../../types/materials/shaders/buildShader.types";

export const setUpVertexEffects = (
  vertexEffects: VertexEffectConfig[],
  uniformConfig: UniformConfig
) => {
  const {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    attributeConfigs,
    structConfigs,
  } = getVertexTransformations(vertexEffects, uniformConfig);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;

  return {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    viewMatrix,
    attributeConfigs,
    structConfigs,
  };
};

const getVertexTransformations = (
  vertexEffects: VertexEffectConfig[],
  configuredUniformConfig: UniformConfig
) => {
  const unmergedUniformConfigs: UniformConfig[] = [];
  const unmergedVaryingConfigs: VaryingConfig[][] = [];
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedStructConfigs: StructConfig[][] = [];
  const unmergedAttributeConfigs: AttributeConfig[][] = [];
  vertexEffects.forEach((effect) => {
    const {
      uniformConfig,
      varyingConfig,
      transformation,
      requiredFunctions,
      attributeConfig = [],
      structConfigs = [],
    } = getVertexEffect(effect, configuredUniformConfig);

    unmergedUniformConfigs.push(uniformConfig);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedAttributeConfigs.push(attributeConfig);
    unmergedTransformations.push(transformation);
    allRequiredFunctions.push(requiredFunctions);
    unmergedStructConfigs.push(structConfigs);
  });

  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedRequiredFunction = reduceFunctions(allRequiredFunctions);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );
  const mergedStructConfigs = mergeStructConfigs(unmergedStructConfigs);
  const transformations = unmergedTransformations.join("");
  return {
    uniformConfigs: mergedUniformConfigs,
    varyingConfigs: mergedVaryingConfigs,
    transformations,

    requiredFunctions: mergedRequiredFunction,
    attributeConfigs: mergedAttributeConfigs,
    structConfigs: mergedStructConfigs,
  };
};
