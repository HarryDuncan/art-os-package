"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomlySpreadCoordinates = void 0;
const MAX_FIND_TIME = 10000;
const generateRandomlySpreadCoordinates = (numCoordinates, allowedBoundingBoxes, exclusionBoundingBoxes, minDistance) => {
    // Create an empty list to store the generated points
    const points = [];
    const startTime = new Date().getTime();
    // While there are fewer points than desired
    while (points.length < numCoordinates) {
        // Select a random point within a certain distance of the existing points
        const now = new Date();
        if (now.getTime() - startTime > MAX_FIND_TIME) {
            break;
        }
        let found = false;
        while (!found) {
            if (now.getTime() - startTime > MAX_FIND_TIME) {
                break;
            }
            // Select a random allowed bounding box
            const allowedBoundingBox = allowedBoundingBoxes[Math.floor(Math.random() * allowedBoundingBoxes.length)];
            // Generate a random point within the bounding box
            const newPoint = {
                x: Math.random() *
                    (allowedBoundingBox.max.x - allowedBoundingBox.min.x) +
                    allowedBoundingBox.min.x,
                y: Math.random() *
                    (allowedBoundingBox.max.y - allowedBoundingBox.min.y) +
                    allowedBoundingBox.min.y,
                z: Math.random() *
                    (allowedBoundingBox.max.z - allowedBoundingBox.min.z) +
                    allowedBoundingBox.min.z,
            };
            // Check if it is at least the minimum distance away from all existing points
            let tooClose = false;
            points.forEach((point) => {
                if (distance(newPoint, point) < minDistance) {
                    tooClose = true;
                }
            });
            // Check if it is in an exclusion bounding box
            let inExclusion = false;
            exclusionBoundingBoxes.forEach((boundingBox) => {
                if (newPoint.x >= boundingBox.min.x &&
                    newPoint.x <= boundingBox.max.x &&
                    newPoint.y >= boundingBox.min.y &&
                    newPoint.y <= boundingBox.max.y &&
                    newPoint.z >= boundingBox.min.z &&
                    newPoint.z <= boundingBox.max.z) {
                    inExclusion = true;
                }
            });
            // If it is far enough away and not in an exclusion bounding box, add it to the list of points
            if (!tooClose && !inExclusion) {
                found = true;
                points.push(newPoint);
            }
        }
    }
    return points;
};
exports.generateRandomlySpreadCoordinates = generateRandomlySpreadCoordinates;
function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
