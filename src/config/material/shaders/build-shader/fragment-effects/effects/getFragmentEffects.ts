import { FragmentEffectConfig, UniformConfig } from "../../buildShader.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { color } from "./color/color";
import { pointMaterial } from "./material/point-material/pointMaterial";
import { interactionBased } from "./interaction-based/interactionBased";
import { FragmentEffectData } from "../fragmentShader.types";

const FRAGMENT_EFFECTS_MAP = {
  [FRAGMENT_EFFECT.POINT_MATERIAL]: pointMaterial,
  [FRAGMENT_EFFECT.POINT_MATERIAL_PIXEL_COLOR]: pointMaterial,
  [FRAGMENT_EFFECT.POINT_MATERIAL_OVERLAY_COLOR]: pointMaterial,
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
  const effectFunction = FRAGMENT_EFFECTS_MAP[effectType];
  if (!effectFunction) {
    console.warn(
      `no fragment transformations configured for ${String(effectType)}`
    );
    return null;
  }
  const fragmentEffectProps = {
    effectUniforms,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
    unfilteredUniforms: uniformConfig,
  };
  return effectFunction(fragmentEffectProps);
};
