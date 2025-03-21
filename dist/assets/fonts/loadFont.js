"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFont = void 0;
const FontLoader_1 = require("three/examples/jsm/loaders/FontLoader");
const loadFont = (fontUrl) => new Promise((resolve) => {
    const loader = new FontLoader_1.FontLoader();
    loader.load(fontUrl, (response) => {
        resolve(response.data);
    });
});
exports.loadFont = loadFont;
