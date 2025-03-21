"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoopType = void 0;
const animationLoop_consts_1 = require("../animationLoop.consts");
const flickerLoop_1 = require("./flicker-loop/flickerLoop");
const incrementLoop_1 = require("./increment-loop/incrementLoop");
const getLoopType = (loopType, duration, loopProps) => {
    const { steepness, speed, loopLimit, minTrough, maxPeak } = formatLoopProps(loopProps);
    switch (loopType) {
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ONE_TO_ONE:
            return (time) => Math.pow((Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5), steepness);
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
            return (time) => Math.pow(((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5), steepness);
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
            return (time) => (time % duration) / duration;
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.COUNT:
            return (time) => {
                const loopCount = Math.floor(time / duration);
                return loopCount % loopLimit;
            };
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.MIN_MAX_RANDOM:
            return (time) => Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5 * Math.random(), maxPeak), minTrough);
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.FLICKER: {
            return (0, flickerLoop_1.flickerLoop)(Object.assign({ duration }, loopProps));
        }
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.MIN_MAX_PAUSE:
            return (time) => {
                return (Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5, maxPeak), minTrough) - Math.max((Math.cos(time * speed) * steepness + 0.5) * 0.5, 0));
            };
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.MIN_MAX:
            return (time) => Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5, maxPeak), minTrough);
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.INCREMENT_LOOP:
            return (0, incrementLoop_1.incrementLoop)(Object.assign({ duration }, loopProps));
        case animationLoop_consts_1.ANIMATION_LOOP_TYPES.LINEAR:
        default:
            return (time) => time * speed;
    }
};
exports.getLoopType = getLoopType;
const formatLoopProps = (parsedLoopProps) => {
    return Object.assign(Object.assign({}, animationLoop_consts_1.DEFAULT_LOOP_PROPS), parsedLoopProps);
};
