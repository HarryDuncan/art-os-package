"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinMeshAlongAxis = void 0;
const position_types_1 = require("../../../utils/three-dimension-space/position/position.types");
const spinMeshAlongAxis = (object, axis, speed) => {
    switch (axis) {
        case position_types_1.AXIS.X:
            object.rotation.x += speed;
            break;
        case position_types_1.AXIS.Y:
            object.rotation.y += speed;
            break;
        case position_types_1.AXIS.Z:
        default:
            object.rotation.z += speed;
            break;
    }
};
exports.spinMeshAlongAxis = spinMeshAlongAxis;
