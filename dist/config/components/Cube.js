"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = void 0;
const three_1 = require("three");
const materials_default_1 = require("../../config/material/materials.default");
const Cube = ({ id, size, position, material = materials_default_1.DEFAULT_MATERIAL, }) => {
    var _a, _b, _c;
    const cubeGeometry = new three_1.BoxGeometry((_a = size === null || size === void 0 ? void 0 : size.x) !== null && _a !== void 0 ? _a : 40, (_b = size === null || size === void 0 ? void 0 : size.y) !== null && _b !== void 0 ? _b : 40, (_c = size === null || size === void 0 ? void 0 : size.z) !== null && _c !== void 0 ? _c : 40);
    const cube = new three_1.Mesh(cubeGeometry, material);
    cube.name = id;
    const { x, y, z } = position;
    cube.position.set(x, y, z);
    return cube;
};
exports.Cube = Cube;
