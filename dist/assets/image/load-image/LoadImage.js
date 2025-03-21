"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = void 0;
const three_1 = require("three");
const loadImage = (path) => new Promise((resolve) => {
    const textureLoader = new three_1.ImageLoader();
    textureLoader.load(path, (data) => {
        resolve(data);
    });
});
exports.loadImage = loadImage;
