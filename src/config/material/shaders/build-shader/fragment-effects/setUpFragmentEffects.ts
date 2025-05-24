import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import { FragmentEffectConfig, ShaderFunction } from "../buildShader.types";
import {
  FRAG_COLOR_NAME,
  FRAGMENT_EFFECT_CONFIG_MAP,
} from "../../../../../consts";
import { FragmentEffectProps } from "./fragmentShader.types";
import { generateFragmentShaderTransformation } from "../helpers/generate-transform/generateTransform";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[]
) => {
  const { transformations, requiredFunctions } =
    getFragmentColors(fragmentEffects);

  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    transformations,
    requiredFunctions,
  };
};

export const getFragmentColors = (fragmentEffects: FragmentEffectConfig[]) => {
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedTransformations: string[] = [];
  fragmentEffects.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect);
    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const mergedTransformations = unmergedTransformations.join("");
  return {
    transformations: mergedTransformations,
    requiredFunctions: mergedRequiredFunction,
  };
};

export const transformSetup = (effectProps: FragmentEffectProps) => {
  const { effectType } = effectProps;
  const effectConfig = FRAGMENT_EFFECT_CONFIG_MAP[effectType];
  if (effectConfig) {
    const { transformationFunctions, transformation } =
      generateFragmentShaderTransformation(
        effectConfig.transformationConfig,
        effectProps
      );

    return {
      transformation,
      requiredFunctions: transformationFunctions,
    };
  } else {
    console.warn(
      `no fragment transformations configured for ${String(effectType)}`
    );
    return null;
  }
};
