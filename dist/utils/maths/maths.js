"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEquidistantValues = exports.stepAndWrap = exports.clamp = exports.easeOutSine = exports.easeOut = exports.getRandomInt = void 0;
const getRandomInt = (max) => Math.floor(Math.random() * max);
exports.getRandomInt = getRandomInt;
const easeOut = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
exports.easeOut = easeOut;
const easeOutSine = (t, b, c, d) => c * Math.sin((t / d) * (Math.PI / 2)) + b;
exports.easeOutSine = easeOutSine;
const clamp = (number, min, max) => Math.max(min, Math.min(number, max));
exports.clamp = clamp;
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
const generateEquidistantValues = (start, end, numPoints) => {
    const values = [];
    for (let i = 0; i <= numPoints; i += 1) {
        const t = i / numPoints;
        const value = start + t * (end - start);
        values.push(value);
    }
    return values;
};
exports.generateEquidistantValues = generateEquidistantValues;
