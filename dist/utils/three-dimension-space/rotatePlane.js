"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotatePlaneToFaceCoordinate = void 0;
const three_1 = require("three");
const rotatePlaneToFaceCoordinate = (currentPosition, targetCoordinate) => {
    const direction = new three_1.Vector3()
        .subVectors(targetCoordinate, currentPosition)
        .normalize();
    const rotation = new three_1.Euler().setFromQuaternion(new three_1.Quaternion().setFromUnitVectors(new three_1.Vector3(0, 0, 1), direction));
    return { x: rotation.x, y: rotation.y, z: rotation.z };
};
exports.rotatePlaneToFaceCoordinate = rotatePlaneToFaceCoordinate;
