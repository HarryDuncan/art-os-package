"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oscillate = void 0;
const animation_constants_1 = require("../../../../animation/animation.constants");
const oscillate = (timestamp, trigFunction, durationMs = 1000) => {
    const angle = ((timestamp % durationMs) / durationMs) * Math.PI * 2;
    switch (trigFunction) {
        case animation_constants_1.TRIG_FUNCTION_TYPES.COS:
            return Math.cos(angle);
        case animation_constants_1.TRIG_FUNCTION_TYPES.TAN:
            return Math.tan(angle);
        case animation_constants_1.TRIG_FUNCTION_TYPES.SIN:
        default:
            return Math.sin(angle);
    }
};
exports.oscillate = oscillate;
