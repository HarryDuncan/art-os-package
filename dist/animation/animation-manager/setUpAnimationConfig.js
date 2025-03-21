"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAnimationConfig = void 0;
const calculateBeizier_1 = require("../animation-functions/mesh-animations/traversal/calculateBeizier");
const animation_constants_1 = require("../animation.constants");
const animation_defaults_1 = require("../animation.defaults");
const conversion_1 = require("../../utils/conversion/conversion");
const setUpAnimationConfig = (animationConfig) => {
    const { animationProperties } = animationConfig;
    switch (animationProperties.animationType) {
        case animation_constants_1.ANIMATION_TYPES.TRAVERSE: {
            const { startPosition, endPosition, curveSize, animationDurationMilis } = animationProperties;
            const curveStart = (0, conversion_1.position3dToVector)(startPosition);
            const curveEnd = (0, conversion_1.position3dToVector)(endPosition);
            const curve = (0, calculateBeizier_1.calculateCurve)(curveStart, curveEnd, curveSize);
            return Object.assign(Object.assign({}, animationConfig), { animationProperties: Object.assign(Object.assign({}, animationProperties), { startPosition: curveStart, endPosition: curveEnd, animationDurationMilis: animationDurationMilis !== null && animationDurationMilis !== void 0 ? animationDurationMilis : animation_defaults_1.DEFAULT_ANIMATION_DURATION_MILIS, curve }) });
        }
        default: {
            return animationConfig;
        }
    }
};
exports.setUpAnimationConfig = setUpAnimationConfig;
