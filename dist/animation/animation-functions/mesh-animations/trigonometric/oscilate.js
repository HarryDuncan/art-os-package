import { TRIG_FUNCTION_TYPES } from "../../../../animation/animation.constants";
export const oscillate = (timestamp, trigFunction, durationMs = 1000) => {
    const angle = ((timestamp % durationMs) / durationMs) * Math.PI * 2;
    switch (trigFunction) {
        case TRIG_FUNCTION_TYPES.COS:
            return Math.cos(angle);
        case TRIG_FUNCTION_TYPES.TAN:
            return Math.tan(angle);
        case TRIG_FUNCTION_TYPES.SIN:
        default:
            return Math.sin(angle);
    }
};
