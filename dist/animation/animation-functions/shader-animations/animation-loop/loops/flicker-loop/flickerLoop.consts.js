"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FLICKER_LOOP_PROPS = exports.FLICKER_LOOP_TYPES = void 0;
exports.FLICKER_LOOP_TYPES = {
    FIXED: "FIXED",
    UNDULATING: "UNDULATING",
};
exports.DEFAULT_FLICKER_LOOP_PROPS = {
    peak: 1,
    trough: 0,
    duration: 200,
    flickerTimeAtMax: 0.5,
    flickerType: exports.FLICKER_LOOP_TYPES.UNDULATING,
};
