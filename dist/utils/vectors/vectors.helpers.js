"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistanceBetweenVectors = void 0;
const calculateDistanceBetweenVectors = (vectorA, vectorB) => {
    const dx = vectorB.x - vectorA.x;
    const dy = vectorB.y - vectorA.y;
    const dz = vectorB.z - vectorA.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
exports.calculateDistanceBetweenVectors = calculateDistanceBetweenVectors;
