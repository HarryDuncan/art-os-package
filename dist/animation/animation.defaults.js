"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SPIN_CONFIG = exports.DEFAULT_ROTATION_CONFIG = exports.DEFAULT_ANIMATION_DURATION_MILIS = void 0;
const position_types_1 = require("../utils/three-dimension-space/position/position.types");
const animation_constants_1 = require("./animation.constants");
exports.DEFAULT_ANIMATION_DURATION_MILIS = 1000;
exports.DEFAULT_ROTATION_CONFIG = {
    animationType: animation_constants_1.ANIMATION_TYPES.ROTATE,
    animationProperties: {
        animationDurationMilis: 700,
        animationPauseMilis: 100,
        repeatAnimation: true,
        rotationAxis: position_types_1.AXIS.Z,
    },
};
exports.DEFAULT_SPIN_CONFIG = {
    animationType: animation_constants_1.ANIMATION_TYPES.SPIN,
    animationProperties: {
        rotationAxis: position_types_1.AXIS.Y,
        speed: 0.009,
        animationDurationMilis: 2000,
        animationPauseMilis: 10,
        repeatAnimation: true,
    },
};
