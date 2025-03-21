import { ANIMATION_LOOP_TYPES, DEFAULT_LOOP_PROPS, } from "../animationLoop.consts";
import { flickerLoop } from "./flicker-loop/flickerLoop";
import { incrementLoop } from "./increment-loop/incrementLoop";
export const getLoopType = (loopType, duration, loopProps) => {
    const { steepness, speed, loopLimit, minTrough, maxPeak } = formatLoopProps(loopProps);
    switch (loopType) {
        case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
            return (time) => Math.pow((Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5), steepness);
        case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
            return (time) => Math.pow(((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5), steepness);
        case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
            return (time) => (time % duration) / duration;
        case ANIMATION_LOOP_TYPES.COUNT:
            return (time) => {
                const loopCount = Math.floor(time / duration);
                return loopCount % loopLimit;
            };
        case ANIMATION_LOOP_TYPES.MIN_MAX_RANDOM:
            return (time) => Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5 * Math.random(), maxPeak), minTrough);
        case ANIMATION_LOOP_TYPES.FLICKER: {
            return flickerLoop(Object.assign({ duration }, loopProps));
        }
        case ANIMATION_LOOP_TYPES.MIN_MAX_PAUSE:
            return (time) => {
                return (Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5, maxPeak), minTrough) - Math.max((Math.cos(time * speed) * steepness + 0.5) * 0.5, 0));
            };
        case ANIMATION_LOOP_TYPES.MIN_MAX:
            return (time) => Math.max(Math.min(Math.cos(time * speed) * steepness + 0.5, maxPeak), minTrough);
        case ANIMATION_LOOP_TYPES.INCREMENT_LOOP:
            return incrementLoop(Object.assign({ duration }, loopProps));
        case ANIMATION_LOOP_TYPES.LINEAR:
        default:
            return (time) => time * speed;
    }
};
const formatLoopProps = (parsedLoopProps) => {
    return Object.assign(Object.assign({}, DEFAULT_LOOP_PROPS), parsedLoopProps);
};
