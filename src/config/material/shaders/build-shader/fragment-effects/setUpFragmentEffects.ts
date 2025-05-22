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
  ParameterConfig,
} from "../buildShader.types";
import { FRAG_COLOR_NAME } from "../../../../../consts";
import { FragmentEffectData } from "./fragmentShader.types";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[],
  materialUniformConfigs: ParameterConfig[]
) => {
  const {
    varyingConfigs,
    uniformConfigs,
    transformations,
    attributeConfigs,
    requiredFunctions,
    structConfigs,
  } = getFragmentColors(fragmentEffects, materialUniformConfigs);

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
  configuredUniformConfig: ParameterConfig[]
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
    const fragmentEffectData = getFragmentEffects(
      effect,
      configuredUniformConfig
    );
    if (fragmentEffectData) {
      unmergedVaryingConfigs.push(fragmentEffectData.varyingConfigs);
      unmergedUniformConfigs.push(fragmentEffectData.uniformConfigs);
      unmergedAttributeConfigs.push(fragmentEffectData.attributeConfigs);
      unmergedTransformations.push(fragmentEffectData.transformation);
      unmergedStructConfigs.push(fragmentEffectData.structConfigs ?? []);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
    }
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
  const { varyingConfigs, uniformConfigs, transformation, attributeConfigs } =
    defaultFragmentEffect();
  const unmergedVaryingConfigs = [varyingConfigs];
  const unmergedUniformConfigs = [uniformConfigs];
  const unmergedTransformations = [transformation];
  const unmergedAttributeConfigs = [attributeConfigs];
  return {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
    unmergedAttributeConfigs,
    unmergedStructConfigs: [] as StructConfig[][],
  };
};

export const defaultFragmentEffect = (): FragmentEffectData => {
  const defaultFrag = ``;
  return {
    requiredFunctions: [],
    uniformConfigs: [],
    transformation: defaultFrag,
    varyingConfigs: [],
    attributeConfigs: [],
  };
};
