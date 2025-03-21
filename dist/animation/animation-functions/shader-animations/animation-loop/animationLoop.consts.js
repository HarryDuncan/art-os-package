export const ANIMATION_LOOP_TYPES = {
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
export const DEFAULT_DURATION_SECONDS = 10;
export const DEFAULT_STEEPNESS = 1;
export const DEFAULT_LOOP_LIMIT = 1;
export const DEFAULT_LOOP_PROPS = {
    duration: DEFAULT_DURATION_SECONDS,
    steepness: DEFAULT_STEEPNESS,
    loopLimit: DEFAULT_LOOP_LIMIT,
    maxPeak: 1,
    minTrough: -1,
    speed: 1,
};
export const ANIMATION_LOOP_KEYPOINTS = {
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
