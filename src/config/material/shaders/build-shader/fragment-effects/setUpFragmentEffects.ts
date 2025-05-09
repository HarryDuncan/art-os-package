import { defaultFragmentEffect } from "./effects/defaultFragmentEffect/defaultFragmentEffect";
import { getFragmentEffects } from "./effects/getFragmentEffects";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeStructConfigs } from "../shader-properties/structs/mergeStructConfigs";
import {
  FragmentEffectConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
} from "../buildShader.types";
import { FRAG_COLOR_NAME } from "../../../../../consts";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[],
  uniformConfig: UniformConfig
) => {
  const {
    varyingConfigs,
    uniformConfigs,
    transformations,
    attributeConfigs,
    requiredFunctions,
    structConfigs,
  } = getFragmentColors(fragmentEffects, uniformConfig);

  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    varyingConfigs,
    uniformConfigs,
    transformations,
    attributeConfigs,
    requiredFunctions,
    structConfigs,
  };
};

export const getFragmentColors = (
  fragmentEffects: FragmentEffectConfig[],
  configuredUniformConfig: UniformConfig
) => {
  const {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
    unmergedAttributeConfigs,
    unmergedStructConfigs,
  } = setUpInitialParameters();
  const allRequiredFunctions: ShaderFunction[][] = [];
  fragmentEffects.forEach((effect) => {
    const {
      varyingConfig,
      uniformConfig,
      transformation,
      requiredFunctions,
      attributeConfig,
      structConfigs = [],
    } = getFragmentEffects(effect, configuredUniformConfig);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedUniformConfigs.push(uniformConfig);
    unmergedAttributeConfigs.push(attributeConfig);
    unmergedTransformations.push(transformation);
    unmergedStructConfigs.push(structConfigs);
    allRequiredFunctions.push(requiredFunctions);
  });

  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );
  const mergedRequiredFunction = reduceFunctions(allRequiredFunctions);
  const mergedStructConfigs = mergeStructConfigs(unmergedStructConfigs);
  const mergedTransformations = unmergedTransformations.join("");
  return {
    varyingConfigs: mergedVaryingConfigs,
    uniformConfigs: mergedUniformConfigs,
    transformations: mergedTransformations,
    attributeConfigs: mergedAttributeConfigs,
    requiredFunctions: mergedRequiredFunction,
    structConfigs: mergedStructConfigs,
  };
};

const setUpInitialParameters = () => {
  const { varyingConfig, uniformConfig, transformation, attributeConfig } =
    defaultFragmentEffect();
  const unmergedVaryingConfigs = [varyingConfig];
  const unmergedUniformConfigs = [uniformConfig];
  const unmergedTransformations = [transformation];
  const unmergedAttributeConfigs = [attributeConfig];
  return {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
    unmergedAttributeConfigs,
    unmergedStructConfigs: [] as StructConfig[][],
  };
};
