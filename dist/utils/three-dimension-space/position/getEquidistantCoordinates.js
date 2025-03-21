import { AXIS } from "./position.types";
export const getEquidistantCoordinates = (numCoordinates, boundingBox, axis) => {
    let interval;
    const midY = (boundingBox.max.y + boundingBox.min.y) / 2;
    switch (axis) {
        case AXIS.X: {
            const maxX = boundingBox.max.x;
            const minX = boundingBox.min.x;
            interval = (maxX - minX) / (numCoordinates + 1);
            return new Array(numCoordinates).fill("").map((_value, index) => ({
                x: minX + interval * index,
                y: midY,
                z: 0,
            }));
        }
        case AXIS.Y: {
            const maxY = boundingBox.max.y;
            const minY = boundingBox.min.y;
            interval = (maxY - minY) / (numCoordinates + 1);
            return new Array(numCoordinates).fill("").map((_value, index) => ({
                x: 0,
                y: minY + interval * index,
                z: 0,
            }));
        }
        case AXIS.Z:
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
