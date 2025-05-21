import { FragmentEffectConfig, UniformConfig } from "../../buildShader.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";

import { interactionBased } from "./interaction-based/interactionBased";
import {
  FragmentEffectData,
  FragmentEffectProps,
} from "../fragmentShader.types";
import { texturedPixelColor, color, overlayPixelColor } from "./color";
import { EMPTY_UNIFORM_CONFIG } from "../../constants/shader.consts";
import { mergeEffectData } from "../../helpers/mergeEffectData";
import { SHADER_TYPES } from "../../constants";
import { pointMaterial } from "./points/pointMaterial";

const FRAGMENT_EFFECTS_MAP = {
  [FRAGMENT_EFFECT.TEXTURE_PIXEL_COLOR]: texturedPixelColor,
  [FRAGMENT_EFFECT.POINT_MATERIAL]: pointMaterial,
  [FRAGMENT_EFFECT.OVERLAY_COLOR]: overlayPixelColor,
  [FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP]: pointMaterial,
  [FRAGMENT_EFFECT.POINT_MATERIAL_TEXTURE]: pointMaterial,
  [FRAGMENT_EFFECT.POINT_MATERIAL_PHONG]: pointMaterial,
  [FRAGMENT_EFFECT.COLOR]: color,
  [FRAGMENT_EFFECT.AFFECTED_POSITION]: interactionBased,
};

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  uniformConfig: UniformConfig
): FragmentEffectData | null => {
  const { effectType, effectParameters, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfig, id);

  const fragmentEffectProps = {
    effectUniforms,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
    unfilteredUniforms: uniformConfig,
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
    attributeConfig,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    attributeConfig: attributeConfig ?? [],
    transformation: transformation ?? "",
    requiredFunctions: requiredFunctions ?? [],
    uniformConfig: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    varyingConfig: varyingConfig ?? [],
  };
};
