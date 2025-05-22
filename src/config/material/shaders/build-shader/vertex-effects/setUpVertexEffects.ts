import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_POINT_NAME } from "./vertexEffects.consts";
import { mergeStructConfigs } from "../shader-properties/structs/mergeStructConfigs";
import {
  AttributeConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
  VertexEffectConfig,
} from "../../../../../types/materials/index";

export const setUpVertexEffects = (
  vertexEffects: VertexEffectConfig[],
  uniformConfigs: UniformConfig[],
  varyingConfigs: VaryingConfig[]
) => {
  const {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    attributeConfigs,
    structConfigs,
  } = getVertexTransformations(vertexEffects, uniformConfigs, varyingConfigs);

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
  configuredUniformConfig: UniformConfig[],
  configuredVaryingConfig: VaryingConfig[]
) => {
  const unmergedUniformConfigs: UniformConfig[][] = [];
  const unmergedVaryingConfigs: VaryingConfig[][] = [];
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedStructConfigs: StructConfig[][] = [];
  const unmergedAttributeConfigs: AttributeConfig[][] = [];
  vertexEffects.forEach((effect) => {
    const vertexEffectData = getVertexEffect(
      effect,
      configuredUniformConfig,
      configuredVaryingConfig
    );
    if (vertexEffectData !== null) {
      const {
        uniformConfigs,
        varyingConfigs,
        transformation,
        requiredFunctions,
        attributeConfigs = [],
        structConfigs = [],
      } = vertexEffectData ?? {};
      unmergedUniformConfigs.push(uniformConfigs);
      unmergedVaryingConfigs.push(varyingConfigs);
      unmergedAttributeConfigs.push(attributeConfigs);
      unmergedTransformations.push(transformation);
      allRequiredFunctions.push(requiredFunctions);
      unmergedStructConfigs.push(structConfigs);
    }
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
