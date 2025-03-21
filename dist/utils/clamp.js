"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
const clamp = (number, min, max) => Math.max(min, Math.min(number, max));
exports.clamp = clamp;
