"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLoopPropsWithDefault = void 0;
const animationLoop_consts_1 = require("../animationLoop.consts");
const formatLoopPropsWithDefault = (defaultLoopProps, parsedLoopProps) => {
    return Object.assign(Object.assign(Object.assign({}, animationLoop_consts_1.DEFAULT_LOOP_PROPS), defaultLoopProps), parsedLoopProps);
};
exports.formatLoopPropsWithDefault = formatLoopPropsWithDefault;
