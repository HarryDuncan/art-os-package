import { Vector3 } from "three";
import { DEFAULT_POSITION } from "../../consts/threejs";
import { vector3DegreesToEuler } from "./degreesToEuler";
export const formatRotationFromConfig = (config) => {
    var _a, _b, _c, _d, _e, _f;
    const rotation = new Vector3(0, 0, 0);
    rotation.setX((_b = (_a = config.rotation) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0);
    rotation.setY((_d = (_c = config.rotation) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0);
    rotation.setZ((_f = (_e = config.rotation) === null || _e === void 0 ? void 0 : _e.z) !== null && _f !== void 0 ? _f : 0);
    const eulerRotation = vector3DegreesToEuler(rotation);
    return eulerRotation;
};
export const formatPositionFromConfig = (config) => {
    var _a, _b, _c, _d, _e, _f;
    const position = Object.assign({}, DEFAULT_POSITION);
    position.x = (_b = (_a = config === null || config === void 0 ? void 0 : config.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0;
    position.y = (_d = (_c = config === null || config === void 0 ? void 0 : config.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
    position.z = (_f = (_e = config === null || config === void 0 ? void 0 : config.position) === null || _e === void 0 ? void 0 : _e.z) !== null && _f !== void 0 ? _f : 0;
    return new Vector3(position.x, position.y, position.z);
};
