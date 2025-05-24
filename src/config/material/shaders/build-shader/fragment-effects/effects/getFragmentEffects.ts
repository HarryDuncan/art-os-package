import { FragmentEffectConfig } from "../../buildShader.types";
import { FRAGMENT_EFFECTS } from "../fragmentEffects.consts";
// import { interactionBased } from "./interaction-based/interactionBased";
import {
  FragmentEffectData,
  FragmentEffectProps,
} from "../fragmentShader.types";
// import { texturedPixelColor, color, overlayPixelColor } from "./color";
// import { mergeEffectData } from "../../helpers/mergeEffectData";
// import { SHADER_TYPES } from "../../constants";
// import { pointMaterial } from "./points/pointMaterial";
import { pointMaterialTransformConfig } from "./points/pointMaterial.consts";
import { generateFragmentShaderTransformation } from "../../helpers/generateTransform";

const FRAGMENT_TRANSFORM_MAP = {
  [FRAGMENT_EFFECTS.POINT_MATERIAL]: pointMaterialTransformConfig,
};

export const getFragmentEffects = (
  effect: FragmentEffectConfig
): FragmentEffectData | null => {
  const { effectType, effectParameters, id } = effect;

  const fragmentEffectProps = {
    id,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
  };
  return transformSetup(fragmentEffectProps);
};

export const transformSetup = (effectProps: FragmentEffectProps) => {
  const { effectType } = effectProps;
  const transformationConfig = FRAGMENT_TRANSFORM_MAP[effectType];
  if (transformationConfig) {
    const { transformationFunctions, transformation } =
      generateFragmentShaderTransformation(transformationConfig, effectProps);

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

export const fragmentEffectToEffectData = (
  effect: Partial<FragmentEffectData>
) => {
  const { requiredFunctions, transformation } = effect;
  return {
    transformation: transformation ?? "",
    requiredFunctions: requiredFunctions ?? [],
  };
};
