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
export const getFragmentEffects = (effect) => {
    const { effectType, effectProps } = effect;
    switch (effectType) {
        case FRAGMENT_EFFECT.OPACITY:
            return opacity(effectProps);
        case FRAGMENT_EFFECT.COLOR:
            return color(effectProps);
        case FRAGMENT_EFFECT.MATCAP:
            return matcapMaterial(effectProps);
        case FRAGMENT_EFFECT.POINT_MATERIAL:
            return pointMaterial(effectProps);
        case FRAGMENT_EFFECT.PHONG:
            return phongMaterial(effectProps);
        case FRAGMENT_EFFECT.PHYSICAL_MATERIAL:
            return physicalMaterial(effectProps);
        case FRAGMENT_EFFECT.INTERACTIVE:
            return getInteractiveEffects(effectProps);
        case FRAGMENT_EFFECT.IMAGE_AS_MASK:
            return imageAsMask();
        case FRAGMENT_EFFECT.VANISH:
            return vanishEffect(effectProps);
        case FRAGMENT_EFFECT.TRIGGERED: {
            return triggeredEffect(effectProps);
        }
        case FRAGMENT_EFFECT.BRIGHTNESS: {
            return brightness(effectProps);
        }
        case FRAGMENT_EFFECT.DEFAULT:
        default:
            return defaultFragmentEffect();
    }
};
