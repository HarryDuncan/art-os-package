"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderTargetParameters = exports.POST_PROCESSOR_PASSES = void 0;
const three_1 = require("three");
exports.POST_PROCESSOR_PASSES = {
    BRIGHTNESS: "brightness",
};
exports.defaultRenderTargetParameters = {
    minFilter: three_1.LinearFilter,
    magFilter: three_1.LinearFilter,
    format: three_1.RGBAFormat,
    stencilBuffer: true,
};
