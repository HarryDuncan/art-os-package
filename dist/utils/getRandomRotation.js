import { vector3DegreesToEuler } from "./three-dimension-space/degreesToEuler";
const DEFAULT_AXIS_OPTIONS = { x: false, y: false, z: false };
export const getRandomRotation = (n, nonRandomizedAxes) => {
    const axisOptions = Object.assign(Object.assign({}, DEFAULT_AXIS_OPTIONS), nonRandomizedAxes);
    const axes = ["x", "y", "z"].filter((axis) => !axisOptions[axis]);
    const results = new Array(n).fill(null).map(() => {
        const rotation = { x: 0, y: 0, z: 0 };
        axes.forEach((axis) => {
            rotation[axis] = Math.random() * 360;
        });
        const eulerRotation = vector3DegreesToEuler(rotation);
        return eulerRotation;
    });
    return results;
};
export const getRandomRotationAsDegrees = (nonRandomizedAxes) => {
    const axisOptions = Object.assign(Object.assign({}, DEFAULT_AXIS_OPTIONS), nonRandomizedAxes);
    const axes = ["x", "y", "z"].filter((axis) => !axisOptions[axis]);
    const rotation = { x: 0, y: 0, z: 0 };
    axes.forEach((axis) => {
        rotation[axis] = Math.random() * 360;
    });
    return rotation;
};
