import {
  BrightnessFragmentEffectProps,
  ColorFragmentEffectProps,
  FragmentEffectConfig,
  FragmentEffectData,
  InteractiveFragmentEffect,
  MaterialEffectProps,
  OpacityFragmentEffectProps,
  PhongFragmentEffectProps,
  PhysicalMaterialProps,
  PointMaterialFragmentEffectProps,
  TriggeredFragmentEffect,
  VanishFragmentEffectProps,
} from "../../types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { brightness } from "./brightness/brightness";
import { color } from "./color/color";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { imageAsMask } from "./image-as-mask/imageAsMask";
import { getInteractiveEffects } from "./interactive/interactiveEffect";
import { matcapMaterial } from "./material/matcap/matcap";
import { phongMaterial } from "./material/phong-material/phong";
import { physicalMaterial } from "./material/physical-material/physicalMaterial";
import { pointMaterial } from "./material/point-material/pointMaterial";
import { opacity } from "./opacity/opacity";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";
import { vanishEffect } from "./vanish/vanish";

export const getFragmentEffects = (
  effect: FragmentEffectConfig
): FragmentEffectData => {
  const { effectType, effectProps } = effect;
  switch (effectType) {
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(effectProps as Partial<OpacityFragmentEffectProps>);
    case FRAGMENT_EFFECT.COLOR:
      return color(effectProps as Partial<ColorFragmentEffectProps>);
    case FRAGMENT_EFFECT.MATCAP:
      return matcapMaterial(effectProps as Partial<MaterialEffectProps>);
    case FRAGMENT_EFFECT.POINT_MATERIAL:
      return pointMaterial(
        effectProps as Partial<PointMaterialFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.PHONG:
      return phongMaterial(effectProps as Partial<PhongFragmentEffectProps>);
    case FRAGMENT_EFFECT.PHYSICAL_MATERIAL:
      return physicalMaterial(effectProps as Partial<PhysicalMaterialProps>);
    case FRAGMENT_EFFECT.INTERACTIVE:
      return getInteractiveEffects(
        effectProps as Partial<InteractiveFragmentEffect>
      );
    case FRAGMENT_EFFECT.IMAGE_AS_MASK:
      return imageAsMask();
    case FRAGMENT_EFFECT.VANISH:
      return vanishEffect(effectProps as Partial<VanishFragmentEffectProps>);
    case FRAGMENT_EFFECT.TRIGGERED: {
      return triggeredEffect(effectProps as Partial<TriggeredFragmentEffect>);
    }
    case FRAGMENT_EFFECT.BRIGHTNESS: {
      return brightness(effectProps as Partial<BrightnessFragmentEffectProps>);
    }
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};
