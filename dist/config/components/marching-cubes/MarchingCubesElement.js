"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarchingCubesElement = void 0;
const MarchingCubes_js_1 = require("three/examples/jsm/objects/MarchingCubes.js");
const marchingCubes_constants_1 = require("./marchingCubes.constants");
const materials_default_1 = require("../../../config/material/materials.default");
const MarchingCubesElement = ({ id, resolution = marchingCubes_constants_1.DEFAULT_RESOLUTION, material = materials_default_1.DEFAULT_MATERIAL, isolation = marchingCubes_constants_1.DEFAULT_ISOLATION, scale = marchingCubes_constants_1.DEFAULT_MARCHING_CUBES_SCALE, }) => {
    const marchingCubeEffect = new MarchingCubes_js_1.MarchingCubes(resolution, material, true, true, 100000);
    marchingCubeEffect.position.set(0, 0, 0);
    marchingCubeEffect.scale.set(scale, scale, scale);
    marchingCubeEffect.isolation = isolation;
    marchingCubeEffect.enableUvs = false;
    marchingCubeEffect.enableColors = false;
    marchingCubeEffect.name = `marching-cubes-${id}`;
    return marchingCubeEffect;
};
exports.MarchingCubesElement = MarchingCubesElement;
