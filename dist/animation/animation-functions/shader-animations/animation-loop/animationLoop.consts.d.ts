export declare const ANIMATION_LOOP_TYPES: {
    ONE_TO_ONE: string;
    ZERO_TO_ONE: string;
    ZERO_TO_ZERO: string;
    MIN_MAX: string;
    MIN_MAX_PAUSE: string;
    MIN_MAX_RANDOM: string;
    COUNT: string;
    LINEAR: string;
    FLICKER: string;
    TRANSITION_LOOP: string;
    INCREMENT_LOOP: string;
};
export declare const DEFAULT_DURATION_SECONDS = 10;
export declare const DEFAULT_STEEPNESS = 1;
export declare const DEFAULT_LOOP_LIMIT = 1;
export declare const DEFAULT_LOOP_PROPS: {
    duration: number;
    steepness: number;
    loopLimit: number;
    maxPeak: number;
    minTrough: number;
    speed: number;
};
export declare const ANIMATION_LOOP_KEYPOINTS: {
    oneToOne: {
        start: number;
        end: number;
    };
    zeroToOne: {
        start: number;
        end: number;
    };
    zeroToZero: {
        start: number;
        end: number;
    };
};
