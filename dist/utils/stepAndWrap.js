"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepAndWrap = void 0;
const stepAndWrap = (min, max, current, step = 1) => {
    const newCurrent = current + step;
    if (newCurrent > max) {
        return min;
    }
    if (newCurrent < min) {
        return max;
    }
    return newCurrent;
};
exports.stepAndWrap = stepAndWrap;
