"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector3DegreesToEuler = exports.degreesToEuler = void 0;
const three_1 = require("three");
const degreesToEuler = (degrees) => {
    return (degrees * Math.PI) / 180;
};
exports.degreesToEuler = degreesToEuler;
const vector3DegreesToEuler = (xyzObject) => {
    const x = (0, exports.degreesToEuler)(xyzObject.x);
    const y = (0, exports.degreesToEuler)(xyzObject.y);
    const z = (0, exports.degreesToEuler)(xyzObject.z);
    return new three_1.Vector3(x, y, z);
};
exports.vector3DegreesToEuler = vector3DegreesToEuler;
