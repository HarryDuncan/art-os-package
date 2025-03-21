"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERACTION_FRAGMENT_EFFECT = exports.IMAGE_FRAGMENT_EFFECT = exports.TRIGGERED_FRAGMENT_EFFECT = exports.DEFAULT_FRAGMENT_EFFECT_PARAMS = exports.DEFAULT_FRAG_COLOR = exports.FRAGMENT_COLOR_NAMES = exports.FRAGMENT_EFFECT = exports.FRAG_COLOR_NAME = void 0;
exports.FRAG_COLOR_NAME = "currentFragColor";
exports.FRAGMENT_EFFECT = {
    DEFAULT: "DEFAULT",
    EMPTY: "EMPTY",
    COLOR: "COLOR",
    MATCAP: "MATCAP",
    MATERIAL: "MATERIAL",
    POINT_MATERIAL: "POINT_MATERIAL",
    OPACITY: "OPACITY",
    INTERACTIVE: "INTERACTIVE",
    TRIGGERED: "TRIGGERED",
    VANISH: "VANISH",
    BRIGHTNESS: "BRIGHTNESS",
    PHYSICAL_MATERIAL: "PHYSICAL_MATERIAL",
    PHONG: "PHONG",
    IMAGE_AS_MASK: "IMAGE_AS_MASK",
};
exports.FRAGMENT_COLOR_NAMES = {
    DEFAULT: "fragColor",
    MATERIAL: "fragMaterialColor",
    POINT_MATERIAL: "fragPointMaterial",
    COLOR: "fragColouredColor",
    OPACITY: "fragOpacity",
    INTERACTIVE: "fragInteractive",
    TRIGGERED: "fragTriggered",
    VANISH: "fragVanish",
    BRIGHTNESS: "fragBrightness",
    PHYSICAL_MATERIAL: "fragPhysicalMaterial",
    MASK_MATERIAL: "maskMaterial",
};
exports.DEFAULT_FRAG_COLOR = "#ff1205";
exports.DEFAULT_FRAGMENT_EFFECT_PARAMS = {
    declareInTransform: true,
};
exports.TRIGGERED_FRAGMENT_EFFECT = {
    COLOR: "COLOR",
    OPACITY: "OPACITY",
    EMPTY: "EMPTY",
};
exports.IMAGE_FRAGMENT_EFFECT = {};
exports.INTERACTION_FRAGMENT_EFFECT = {
    COLOR: "COLOR",
};
