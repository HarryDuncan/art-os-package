"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATION_LOOP_KEYPOINTS = exports.DEFAULT_LOOP_PROPS = exports.DEFAULT_LOOP_LIMIT = exports.DEFAULT_STEEPNESS = exports.DEFAULT_DURATION_SECONDS = exports.ANIMATION_LOOP_TYPES = void 0;
exports.ANIMATION_LOOP_TYPES = {
    ONE_TO_ONE: "ONE_TO_ONE",
    ZERO_TO_ONE: "ZERO_TO_ONE",
    ZERO_TO_ZERO: "ZERO_TO_ZERO",
    MIN_MAX: "MIN_MAX",
    MIN_MAX_PAUSE: "MIN_MAX_PAUSE",
    MIN_MAX_RANDOM: "MIN_MAX_RANDOM",
    COUNT: "COUNT",
    LINEAR: "LINEAR",
    FLICKER: "FLICKER",
    TRANSITION_LOOP: "TRANSITION_LOOP",
    INCREMENT_LOOP: "INCREMENT",
};
exports.DEFAULT_DURATION_SECONDS = 10;
exports.DEFAULT_STEEPNESS = 1;
exports.DEFAULT_LOOP_LIMIT = 1;
exports.DEFAULT_LOOP_PROPS = {
    duration: exports.DEFAULT_DURATION_SECONDS,
    steepness: exports.DEFAULT_STEEPNESS,
    loopLimit: exports.DEFAULT_LOOP_LIMIT,
    maxPeak: 1,
    minTrough: -1,
    speed: 1,
};
exports.ANIMATION_LOOP_KEYPOINTS = {
    oneToOne: {
        start: 1,
        end: 1,
    },
    zeroToOne: {
        start: 0,
        end: 1,
    },
    zeroToZero: {
        start: 0,
        end: 0,
    },
};
