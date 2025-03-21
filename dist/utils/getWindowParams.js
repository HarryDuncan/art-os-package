"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowParams = void 0;
const getWindowParams = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;
    return { width, height, pixelRatio };
};
exports.getWindowParams = getWindowParams;
