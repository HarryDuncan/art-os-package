import { FragmentEffectConfig, ParameterConfig } from "../../buildShader.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { FRAGMENT_EFFECTS } from "../fragmentEffects.consts";

import { interactionBased } from "./interaction-based/interactionBased";
import {
  FragmentEffectData,
  FragmentEffectProps,
} from "../fragmentShader.types";
import { texturedPixelColor, color, overlayPixelColor } from "./color";
import { mergeEffectData } from "../../helpers/mergeEffectData";
import { SHADER_TYPES } from "../../constants";
import { pointMaterial } from "./points/pointMaterial";

const FRAGMENT_EFFECTS_MAP = {
  [FRAGMENT_EFFECTS.TEXTURE_PIXEL_COLOR]: texturedPixelColor,
  [FRAGMENT_EFFECTS.POINT_MATERIAL]: pointMaterial,
  [FRAGMENT_EFFECTS.OVERLAY_COLOR]: overlayPixelColor,
  [FRAGMENT_EFFECTS.POINT_MATERIAL_MATCAP]: pointMaterial,
  [FRAGMENT_EFFECTS.POINT_MATERIAL_TEXTURE]: pointMaterial,
  [FRAGMENT_EFFECTS.POINT_MATERIAL_PHONG]: pointMaterial,
  [FRAGMENT_EFFECTS.COLOR]: color,
  [FRAGMENT_EFFECTS.AFFECTED_POSITION]: interactionBased,
};

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  uniformConfigs: ParameterConfig[]
): FragmentEffectData | null => {
  const { effectType, effectParameters, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfigs, id);

  const fragmentEffectProps = {
    effectUniforms,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
    unfilteredUniforms: uniformConfigs,
  };
  return transformSetup(fragmentEffectProps);
};

export const transformSetup = (effectProps: FragmentEffectProps) => {
  const { effectType } = effectProps;
  const effectFunction = FRAGMENT_EFFECTS_MAP[effectType];
  if (effectFunction) {
    const effectData = fragmentEffectToEffectData(effectFunction(effectProps));
    return mergeEffectData(effectData, effectType, SHADER_TYPES.FRAGMENT);
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
  const {
    attributeConfigs,
    requiredFunctions,
    transformation,
    uniformConfigs,
    varyingConfigs,
  } = effect;
  return {
    attributeConfigs: attributeConfigs ?? [],
    transformation: transformation ?? "",
    requiredFunctions: requiredFunctions ?? [],
    uniformConfigs: uniformConfigs ?? [],
    varyingConfigs: varyingConfigs ?? [],
  };
};
