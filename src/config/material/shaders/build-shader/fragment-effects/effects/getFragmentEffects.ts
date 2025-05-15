import { FragmentEffectConfig, UniformConfig } from "../../buildShader.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { brightness } from "./brightness/brightness";
import { color } from "./color/color";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { matcapMaterial } from "./material/matcap/matcap";
import { phongMaterial } from "./material/phong-material/phong";
import { physicalMaterial } from "./material/physical-material/physicalMaterial";
import { pointMaterial } from "./material/point-material/pointMaterial";
import { opacity } from "./opacity/opacity";
import { vanishEffect } from "./vanish/vanish";
import {
  BrightnessFragmentEffectProps,
  ColorFragmentEffectProps,
  FragmentEffectData,
  MaterialEffectProps,
  OpacityFragmentEffectProps,
  PhongFragmentEffectProps,
  PhysicalMaterialProps,
  PointMaterialFragmentEffectProps,
  VanishFragmentEffectProps,
} from "../fragmentShader.types";
import { interactionBased } from "./interaction-based/interactionBased";

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  uniformConfig: UniformConfig
): FragmentEffectData => {
  const { effectType, effectProps, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfig, id);

  switch (effectType) {
    case FRAGMENT_EFFECT.POINT_MATERIAL:
    case FRAGMENT_EFFECT.POINT_MATERIAL_PIXEL_COLOR:
    case FRAGMENT_EFFECT.POINT_MATERIAL_OVERLAY_COLOR:
    case FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP:
    case FRAGMENT_EFFECT.POINT_MATERIAL_TEXTURE:
    case FRAGMENT_EFFECT.POINT_MATERIAL_PHONG:
      return pointMaterial(
        effectType,
        effectProps as Partial<PointMaterialFragmentEffectProps>,
        effectUniforms
      );
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(effectProps as Partial<OpacityFragmentEffectProps>);
    case FRAGMENT_EFFECT.COLOR:
      return color(
        effectUniforms,
        effectProps as Partial<ColorFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.MATCAP:
      return matcapMaterial(effectProps as Partial<MaterialEffectProps>);
    case FRAGMENT_EFFECT.PHONG:
      return phongMaterial(effectProps as Partial<PhongFragmentEffectProps>);
    case FRAGMENT_EFFECT.PHYSICAL_MATERIAL:
      return physicalMaterial(effectProps as Partial<PhysicalMaterialProps>);
    case FRAGMENT_EFFECT.AFFECTED_POSITION:
      return interactionBased(
        effectType,
        effectUniforms,
        uniformConfig,
        effect.subEffects || []
      );
    // case FRAGMENT_EFFECT.IMAGE_AS_MASK:
    //   return imageAsMask();
    case FRAGMENT_EFFECT.VANISH:
      return vanishEffect(effectProps as Partial<VanishFragmentEffectProps>);
    case FRAGMENT_EFFECT.BRIGHTNESS: {
      return brightness(effectProps as Partial<BrightnessFragmentEffectProps>);
    }
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};
