"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolution = void 0;
const three_1 = require("three");
const getResolution = () => {
    // TODO - when used in app get window height/width
    return new three_1.Vector2(1, 1);
};
exports.getResolution = getResolution;
