"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderBackground = void 0;
const three_1 = require("three");
const PlaneElement_1 = require("../PlaneElement");
const DEFAULT_SIZE = new three_1.Vector2(40, 40);
const DEFAULT_POSITION = new three_1.Vector3(0, 0, -5);
const ShaderBackground = ({ material, size = DEFAULT_SIZE, position = DEFAULT_POSITION, }) => {
    const id = "background-shader";
    return (0, PlaneElement_1.PlaneElement)({ id, size, position, material });
};
exports.ShaderBackground = ShaderBackground;
