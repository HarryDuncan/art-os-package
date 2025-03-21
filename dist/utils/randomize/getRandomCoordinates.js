"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCoordinates = void 0;
const getRandomCoordinates = (numberOfCoodinates, boundingBox) => {
    const { lowerBoundX, upperBoundX, lowerBoundY, upperBoundY, lowerBoundZ, upperBoundZ, } = boundingBox;
    // Check that the bounds are valid
    if (lowerBoundX >= upperBoundX ||
        lowerBoundY >= upperBoundY ||
        lowerBoundZ >= upperBoundZ) {
        throw new Error("Invalid bounds: the lower bound must be less than the upper bound for each dimension");
    }
    // Generate the coordinates
    const coordinates = [];
    for (let i = 0; i < numberOfCoodinates; i += 1) {
        const x = Math.random() * (upperBoundX - lowerBoundX) + lowerBoundX;
        const y = Math.random() * (upperBoundY - lowerBoundY) + lowerBoundY;
        const z = Math.random() * (upperBoundZ - lowerBoundZ) + lowerBoundZ;
        coordinates.push({ x, y, z });
    }
    return coordinates;
};
exports.getRandomCoordinates = getRandomCoordinates;
