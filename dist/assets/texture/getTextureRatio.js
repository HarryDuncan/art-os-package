"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextureRatio = exports.getRatio = void 0;
const three_1 = require("three");
const getRatio = (height, width) => {
    const m = multiplyMatrixAndPoint(rotateMatrix(three_1.MathUtils.degToRad(0)), [
        width,
        height,
    ]);
    const originalRatio = {
        w: m[0] / width,
        h: m[1] / height,
    };
    const coverRatio = 1 / Math.max(originalRatio.w, originalRatio.h);
    return new three_1.Vector2(originalRatio.w * coverRatio, originalRatio.h * coverRatio);
};
exports.getRatio = getRatio;
const getTextureRatio = (texture) => {
    const { height, width } = texture.image;
    return (0, exports.getRatio)(height, width);
};
exports.getTextureRatio = getTextureRatio;
const multiplyMatrixAndPoint = (matrix, point) => {
    const c0r0 = matrix[0];
    const c1r0 = matrix[1];
    const c0r1 = matrix[2];
    const c1r1 = matrix[3];
    const x = point[0];
    const y = point[1];
    return [Math.abs(x * c0r0 + y * c0r1), Math.abs(x * c1r0 + y * c1r1)];
};
const rotateMatrix = (a) => [
    Math.cos(a),
    -Math.sin(a),
    Math.sin(a),
    Math.cos(a),
];
