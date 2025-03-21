"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SphericalBackground = void 0;
const three_1 = require("three");
const threeDSpace_constants_1 = require("../../utils/three-dimension-space/threeDSpace.constants");
const materials_default_1 = require("../../config/material/materials.default");
const SphericalBackground = ({ id, position, radius, rotation = threeDSpace_constants_1.DEFAULT_ROTATION, material = materials_default_1.DEFAULT_MATERIAL, }) => {
    const sphereGeometry = new three_1.SphereGeometry(radius, 32, 16);
    const sphere = new three_1.Mesh(sphereGeometry, material);
    sphere.name = id;
    const { x, y, z } = position;
    sphere.position.set(x, y, z);
    setRotation(sphere, rotation);
    return sphere;
};
exports.SphericalBackground = SphericalBackground;
const setRotation = (object, rotation) => {
    const { x, y, z } = rotation;
    object.rotation.set(x, y, z);
};
