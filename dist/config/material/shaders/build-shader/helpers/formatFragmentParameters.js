"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFragmentParameters = void 0;
const fragmentEffects_consts_1 = require("../fragment-effects/fragmentEffects.consts");
const formatFragmentParameters = (parsedEffectProps, defaultEffectProps) => {
    return Object.assign(Object.assign(Object.assign({}, fragmentEffects_consts_1.DEFAULT_FRAGMENT_EFFECT_PARAMS), defaultEffectProps), parsedEffectProps);
};
exports.formatFragmentParameters = formatFragmentParameters;
