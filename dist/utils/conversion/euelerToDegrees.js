"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eulerToDegrees = void 0;
const eulerToDegrees = (value) => {
    const degree = value * (180 / Math.PI);
    return degree;
};
exports.eulerToDegrees = eulerToDegrees;
