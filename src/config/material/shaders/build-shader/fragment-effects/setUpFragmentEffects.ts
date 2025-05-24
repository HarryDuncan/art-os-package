import { getFragmentEffects } from "./effects/getFragmentEffects";
import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import { FragmentEffectConfig, ShaderFunction } from "../buildShader.types";
import { FRAG_COLOR_NAME } from "../../../../../consts";

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
    const fragmentEffectData = getFragmentEffects(effect);
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
