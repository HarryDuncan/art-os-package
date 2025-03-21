"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCentroid = void 0;
const three_1 = require("three");
const getCentroid = (vectors) => {
    const center = new three_1.Vector3();
    vectors.forEach((vector) => {
        center.add(vector);
    });
    center.divideScalar(vectors.length);
    return center;
};
exports.getCentroid = getCentroid;
