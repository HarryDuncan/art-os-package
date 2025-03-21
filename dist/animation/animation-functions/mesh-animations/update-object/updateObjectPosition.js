"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateObjectPosition = void 0;
const position_types_1 = require("../../../../utils/three-dimension-space/position/position.types");
const updateObjectPosition = (object, value, axis) => {
    const { position: { x, y, z }, } = object;
    switch (axis) {
        case position_types_1.AXIS.X:
            object.position.set(value, y, z);
            break;
        case position_types_1.AXIS.Y:
            object.position.set(x, value, z);
            break;
        case position_types_1.AXIS.Z:
        default:
            object.position.set(x, y, value);
    }
};
exports.updateObjectPosition = updateObjectPosition;
