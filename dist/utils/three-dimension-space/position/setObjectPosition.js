"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setObjectPosition = void 0;
const setObjectPosition = (object, position) => {
    const { x, y, z } = position;
    object.position.set(x, y, z);
};
exports.setObjectPosition = setObjectPosition;
