"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomRotationAsDegrees = exports.getRandomRotation = void 0;
const degreesToEuler_1 = require("../../utils/three-dimension-space/degreesToEuler");
const DEFAULT_AXIS_OPTIONS = { x: false, y: false, z: false };
const getRandomRotation = (n, nonRandomizedAxes) => {
    const axisOptions = Object.assign(Object.assign({}, DEFAULT_AXIS_OPTIONS), nonRandomizedAxes);
    const axes = ["x", "y", "z"].filter((axis) => !axisOptions[axis]);
    const results = new Array(n).fill(null).map(() => {
        const rotation = { x: 0, y: 0, z: 0 };
        axes.forEach((axis) => {
            rotation[axis] = Math.random() * 360;
        });
        const eulerRotation = (0, degreesToEuler_1.vector3DegreesToEuler)(rotation);
        return eulerRotation;
    });
    return results;
};
exports.getRandomRotation = getRandomRotation;
const getRandomRotationAsDegrees = (nonRandomizedAxes) => {
    const axisOptions = Object.assign(Object.assign({}, DEFAULT_AXIS_OPTIONS), nonRandomizedAxes);
    const axes = ["x", "y", "z"].filter((axis) => !axisOptions[axis]);
    const rotation = { x: 0, y: 0, z: 0 };
    axes.forEach((axis) => {
        rotation[axis] = Math.random() * 360;
    });
    return rotation;
};
exports.getRandomRotationAsDegrees = getRandomRotationAsDegrees;
