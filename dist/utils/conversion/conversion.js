"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToVector = exports.positionConfigToPosition = exports.positionToArray = exports.vectorToArray = exports.vectorToPosition3d = exports.position3dToVector = void 0;
const three_1 = require("three");
const position3dToVector = (position) => {
    const { x, y, z } = position;
    return new three_1.Vector3(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
};
exports.position3dToVector = position3dToVector;
const vectorToPosition3d = (vector) => ({
    x: vector.x,
    y: vector.y,
    z: vector.z,
});
exports.vectorToPosition3d = vectorToPosition3d;
const vectorToArray = (vector) => {
    const { x, y, z } = vector;
    return [x, y, z];
};
exports.vectorToArray = vectorToArray;
const positionToArray = (position) => Object.values(position).map((value) => value);
exports.positionToArray = positionToArray;
const positionConfigToPosition = (positionConfig) => {
    var _a, _b, _c;
    return {
        x: (_a = positionConfig.x) !== null && _a !== void 0 ? _a : 0,
        y: (_b = positionConfig.y) !== null && _b !== void 0 ? _b : 0,
        z: (_c = positionConfig.z) !== null && _c !== void 0 ? _c : 0,
    };
};
exports.positionConfigToPosition = positionConfigToPosition;
const arrayToVector = (numberArray) => {
    var _a, _b;
    const arrayLength = numberArray.length;
    switch (arrayLength) {
        case 2:
            return new three_1.Vector2(numberArray[0], numberArray[1]);
        case 3:
            return new three_1.Vector3(numberArray[0], numberArray[1], numberArray[2]);
        case 4:
            return new three_1.Vector4(numberArray[0], numberArray[1], numberArray[2], numberArray[3]);
        default:
            console.warn(`${arrayLength} can not be matched to a vector size - returning a 2d vector`);
            return new three_1.Vector2((_a = numberArray[0]) !== null && _a !== void 0 ? _a : 0, (_b = numberArray[1]) !== null && _b !== void 0 ? _b : 0);
    }
};
exports.arrayToVector = arrayToVector;
