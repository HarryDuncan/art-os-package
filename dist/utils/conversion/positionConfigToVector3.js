"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionConfigToVector3 = void 0;
const three_1 = require("three");
const positionConfigToVector3 = (position) => {
    const { x, y, z } = position;
    return new three_1.Vector3(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
};
exports.positionConfigToVector3 = positionConfigToVector3;
