"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionalLightElement = void 0;
const threejs_1 = require("../../../consts/threejs");
const three_1 = require("three");
const setObjectPosition_1 = require("../../../utils/three-dimension-space/position/setObjectPosition");
const lights_consts_1 = require("../lights.consts");
const DirectionalLightElement = ({ name, color, position = threejs_1.DEFAULT_VECTOR_POSITION, }) => {
    const light = new three_1.DirectionalLight(color !== null && color !== void 0 ? color : lights_consts_1.DEFAULT_LIGHT_COLOR);
    (0, setObjectPosition_1.setObjectPosition)(light, position);
    light.intensity = 1;
    light.name = name;
    return light;
};
exports.DirectionalLightElement = DirectionalLightElement;
