"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GREEN_SCREEN = exports.DEFAULT_VECTOR_POSITION = exports.DEFAULT_POSITION = void 0;
const three_1 = require("three");
exports.DEFAULT_POSITION = { x: 0, y: 0, z: 0 };
exports.DEFAULT_VECTOR_POSITION = new three_1.Vector3(0, 0, 0);
exports.GREEN_SCREEN = new three_1.MeshBasicMaterial({
    color: "#00ff00",
});
