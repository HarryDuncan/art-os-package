"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flickerLoop = void 0;
const formatLoopPropsWithDefault_1 = require("../../helpers/formatLoopPropsWithDefault");
const flickerLoop_consts_1 = require("./flickerLoop.consts");
const flickerLoop = (flickerLoopProps) => {
    const { flickerTimeAtMax, flickerType, peak, trough } = (0, formatLoopPropsWithDefault_1.formatLoopPropsWithDefault)(flickerLoop_consts_1.DEFAULT_FLICKER_LOOP_PROPS, flickerLoopProps);
    switch (flickerType) {
        case flickerLoop_consts_1.FLICKER_LOOP_TYPES.UNDULATING:
            return (time) => (Math.tan(time * 150) + 0.5) * Math.random() >
                Math.cos(time) * flickerTimeAtMax
                ? peak
                : trough;
        // return (time: number) =>
        //   (Math.sin(time * 150) + 0.5) * Math.random() >
        //   Math.cos(time) * flickerTimeAtMax
        //     ? peak
        //     : trough;
        // case FLICKER_LOOP_TYPES.SLOW_FLICKER:
        //     return (time: number) =>
        //       (Math.sin(time * 150) + 0.5) * Math.random() >
        //       Math.sin(time) * flickerTimeAtMax
        //         ? peak
        //         : trough;
        case flickerLoop_consts_1.FLICKER_LOOP_TYPES.FIXED:
        default:
            return (time) => (Math.sin(time * 150) + 0.5) * Math.random() > flickerTimeAtMax
                ? peak
                : trough;
    }
};
exports.flickerLoop = flickerLoop;
