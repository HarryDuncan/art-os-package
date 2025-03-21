"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTexture = void 0;
const three_1 = require("three");
const loadTexture = (path) => new Promise((resolve) => {
    const textureLoader = new three_1.TextureLoader();
    textureLoader.load(path, (data) => {
        if (!three_1.MathUtils.isPowerOfTwo(data.image.width) ||
            !three_1.MathUtils.isPowerOfTwo(data.image.height)) {
            console.warn(`"${path}" image size is not power of 2.`);
        }
        data.minFilter = three_1.LinearFilter;
        data.magFilter = three_1.LinearFilter;
        data.format = three_1.RGBAFormat;
        data.needsUpdate = true;
        resolve(data);
    });
});
exports.loadTexture = loadTexture;
