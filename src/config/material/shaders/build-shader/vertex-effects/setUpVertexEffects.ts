import {
  AttributeConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
  VertexEffectConfig,
} from "../types";
import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_EFFECT_POINT_NAMES } from "./vertexEffects.consts";
import { mergeStructConfigs } from "../shader-properties/structs/mergeStructConfigs";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const {
    uniformConfigs,
    varyingConfigs,
    transformations,
    previousPointName,
    requiredFunctions,
    attributeConfigs,
    structConfigs,
  } = getVertexTransformations(vertexEffects);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${previousPointName}.xyz, 1.0);`;

  return {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    viewMatrix,
    previousPointName,
    attributeConfigs,
    structConfigs,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  let previousPointName = VERTEX_EFFECT_POINT_NAMES.DEFAULT_POINT;
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
      pointName,
      requiredFunctions,
      attributeConfig = [],
      structConfigs = [],
    } = getVertexEffect(effect, previousPointName);
    previousPointName = pointName;
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
    previousPointName,
    requiredFunctions: mergedRequiredFunction,
    attributeConfigs: mergedAttributeConfigs,
    structConfigs: mergedStructConfigs,
  };
};
