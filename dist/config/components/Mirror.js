"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mirror = void 0;
const three_1 = require("three");
const Reflector_1 = require("three/examples/jsm/objects/Reflector");
const rotatePlane_1 = require("../../utils/three-dimension-space/rotatePlane");
const Mirror = ({ id, geometry, position, }) => {
    const mirror = new Reflector_1.Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: new three_1.Color(0x19191a),
    });
    mirror.name = id;
    mirror.position.set(position.x, position.y, position.z);
    const targetCoordinate = new three_1.Vector3(0, 0, 0);
    const newRotation = (0, rotatePlane_1.rotatePlaneToFaceCoordinate)(position, targetCoordinate);
    mirror.rotation.set(newRotation.x, newRotation.y, newRotation.z);
    return mirror;
};
exports.Mirror = Mirror;
