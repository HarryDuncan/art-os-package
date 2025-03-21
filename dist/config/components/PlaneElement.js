"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaneElement = void 0;
const three_1 = require("three");
const materials_default_1 = require("../../config/material/materials.default");
const PlaneElement = ({ id, size, position, material = materials_default_1.DEFAULT_MATERIAL, }) => {
    var _a, _b;
    const planeGeometry = new three_1.PlaneGeometry((_a = size === null || size === void 0 ? void 0 : size.x) !== null && _a !== void 0 ? _a : 100, (_b = size === null || size === void 0 ? void 0 : size.y) !== null && _b !== void 0 ? _b : 60);
    const plane = new three_1.Mesh(planeGeometry, material);
    plane.name = id;
    const { x, y, z } = position;
    plane.position.set(x, y, z);
    return plane;
};
exports.PlaneElement = PlaneElement;
