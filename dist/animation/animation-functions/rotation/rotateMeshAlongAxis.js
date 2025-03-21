"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateMeshAlongAxis = void 0;
const position_types_1 = require("../../../utils/three-dimension-space/position/position.types");
const rotateMeshAlongAxis = (mesh, axis, angle) => {
    mesh.geometry.computeBoundingBox();
    if (!mesh.geometry || !mesh.geometry.boundingBox) {
        console.warn("no bounding box");
        return;
    }
    switch (axis) {
        case position_types_1.AXIS.X:
            mesh.rotateX(angle - mesh.rotation.x);
            break;
        case position_types_1.AXIS.Y:
            mesh.rotateY(angle - mesh.rotation.y);
            break;
        case position_types_1.AXIS.Z:
        default:
            mesh.rotateZ(angle - mesh.rotation.z);
    }
};
exports.rotateMeshAlongAxis = rotateMeshAlongAxis;
