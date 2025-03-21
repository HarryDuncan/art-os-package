"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveObject = void 0;
const calculatePositionDistance_1 = require("../../../../utils/three-dimension-space/calculatePositionDistance");
const moveObject = (mesh, progress, moveTo, moveFrom, count) => {
    const prog = count % 2 === 0 ? 1.0 - progress : progress;
    // get distance for each axis
    const distance = (0, calculatePositionDistance_1.calculatePositionDistance)(moveFrom, moveTo);
    // set obj position as distance * progress
    const newX = moveFrom.x + distance.x * prog;
    const newY = moveFrom.y + distance.y * prog;
    const newZ = moveFrom.z + distance.z * prog;
    mesh.position.set(newX, newY, newZ);
};
exports.moveObject = moveObject;
