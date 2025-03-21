"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragmentEffects = void 0;
const fragmentEffects_consts_1 = require("../fragmentEffects.consts");
const brightness_1 = require("./brightness/brightness");
const color_1 = require("./color/color");
const defaultFragmentEffect_1 = require("./defaultFragmentEffect/defaultFragmentEffect");
const imageAsMask_1 = require("./image-as-mask/imageAsMask");
const interactiveEffect_1 = require("./interactive/interactiveEffect");
const matcap_1 = require("./material/matcap/matcap");
const phong_1 = require("./material/phong-material/phong");
const physicalMaterial_1 = require("./material/physical-material/physicalMaterial");
const pointMaterial_1 = require("./material/point-material/pointMaterial");
const opacity_1 = require("./opacity/opacity");
const triggeredEffect_1 = require("./triggered-effect/triggeredEffect");
const vanish_1 = require("./vanish/vanish");
const getFragmentEffects = (effect) => {
    const { effectType, effectProps } = effect;
    switch (effectType) {
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.OPACITY:
            return (0, opacity_1.opacity)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.COLOR:
            return (0, color_1.color)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.MATCAP:
            return (0, matcap_1.matcapMaterial)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.POINT_MATERIAL:
            return (0, pointMaterial_1.pointMaterial)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.PHONG:
            return (0, phong_1.phongMaterial)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.PHYSICAL_MATERIAL:
            return (0, physicalMaterial_1.physicalMaterial)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.INTERACTIVE:
            return (0, interactiveEffect_1.getInteractiveEffects)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.IMAGE_AS_MASK:
            return (0, imageAsMask_1.imageAsMask)();
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.VANISH:
            return (0, vanish_1.vanishEffect)(effectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.TRIGGERED: {
            return (0, triggeredEffect_1.triggeredEffect)(effectProps);
        }
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.BRIGHTNESS: {
            return (0, brightness_1.brightness)(effectProps);
        }
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.DEFAULT:
        default:
            return (0, defaultFragmentEffect_1.defaultFragmentEffect)();
    }
};
exports.getFragmentEffects = getFragmentEffects;
