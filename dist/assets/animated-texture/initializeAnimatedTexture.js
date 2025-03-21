"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeAnimatedTexture = void 0;
const three_1 = require("three");
const initalizeAnimatedTexture = (videoElement) => {
    const texture = new three_1.VideoTexture(videoElement);
    return texture;
};
exports.initalizeAnimatedTexture = initalizeAnimatedTexture;
