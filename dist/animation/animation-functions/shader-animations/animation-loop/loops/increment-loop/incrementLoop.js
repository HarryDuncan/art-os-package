"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementLoop = void 0;
const formatLoopPropsWithDefault_1 = require("../../helpers/formatLoopPropsWithDefault");
const incrementLoop_consts_1 = require("./incrementLoop.consts");
const incrementLoop = (incrementLoopProps) => {
    const loopProps = (0, formatLoopPropsWithDefault_1.formatLoopPropsWithDefault)(incrementLoop_consts_1.DEFAULT_INCREMENT_LOOP_PROPS, incrementLoopProps);
    const { overlapPercentage, duration } = loopProps;
    return (time) => {
        const progress = (time % duration) / duration;
        const loopCount = Math.floor(time / duration);
        const normalizedProgress = Math.sin(progress * Math.PI) * loopCount;
        return normalizedProgress * (1 + overlapPercentage);
    };
};
exports.incrementLoop = incrementLoop;
