"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquidistantCoordinates = void 0;
const position_types_1 = require("./position.types");
const getEquidistantCoordinates = (numCoordinates, boundingBox, axis) => {
    let interval;
    const midY = (boundingBox.max.y + boundingBox.min.y) / 2;
    switch (axis) {
        case position_types_1.AXIS.X: {
            const maxX = boundingBox.max.x;
            const minX = boundingBox.min.x;
            interval = (maxX - minX) / (numCoordinates + 1);
            return new Array(numCoordinates).fill("").map((_value, index) => ({
                x: minX + interval * index,
                y: midY,
                z: 0,
            }));
        }
        case position_types_1.AXIS.Y: {
            const maxY = boundingBox.max.y;
            const minY = boundingBox.min.y;
            interval = (maxY - minY) / (numCoordinates + 1);
            return new Array(numCoordinates).fill("").map((_value, index) => ({
                x: 0,
                y: minY + interval * index,
                z: 0,
            }));
        }
        case position_types_1.AXIS.Z:
        default: {
            const maxZ = boundingBox.max.z;
            const minZ = boundingBox.min.z;
            interval = (maxZ - minZ) / (numCoordinates + 1);
            return new Array(numCoordinates).fill("").map((_value, index) => ({
                x: 0,
                y: 0,
                z: minZ + interval * index,
            }));
        }
    }
};
exports.getEquidistantCoordinates = getEquidistantCoordinates;
