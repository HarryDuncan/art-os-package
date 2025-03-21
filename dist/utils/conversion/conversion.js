import { Vector2, Vector3, Vector4 } from "three";
export const position3dToVector = (position) => {
    const { x, y, z } = position;
    return new Vector3(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
};
export const vectorToPosition3d = (vector) => ({
    x: vector.x,
    y: vector.y,
    z: vector.z,
});
export const vectorToArray = (vector) => {
    const { x, y, z } = vector;
    return [x, y, z];
};
export const positionToArray = (position) => Object.values(position).map((value) => value);
export const positionConfigToPosition = (positionConfig) => {
    var _a, _b, _c;
    return {
        x: (_a = positionConfig.x) !== null && _a !== void 0 ? _a : 0,
        y: (_b = positionConfig.y) !== null && _b !== void 0 ? _b : 0,
        z: (_c = positionConfig.z) !== null && _c !== void 0 ? _c : 0,
    };
};
export const arrayToVector = (numberArray) => {
    var _a, _b;
    const arrayLength = numberArray.length;
    switch (arrayLength) {
        case 2:
            return new Vector2(numberArray[0], numberArray[1]);
        case 3:
            return new Vector3(numberArray[0], numberArray[1], numberArray[2]);
        case 4:
            return new Vector4(numberArray[0], numberArray[1], numberArray[2], numberArray[3]);
        default:
            console.warn(`${arrayLength} can not be matched to a vector size - returning a 2d vector`);
            return new Vector2((_a = numberArray[0]) !== null && _a !== void 0 ? _a : 0, (_b = numberArray[1]) !== null && _b !== void 0 ? _b : 0);
    }
};
