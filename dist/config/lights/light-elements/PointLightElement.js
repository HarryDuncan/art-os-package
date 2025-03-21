"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLightElement = void 0;
const threejs_1 = require("../../../consts/threejs");
const three_1 = require("three");
const setObjectPosition_1 = require("../../../utils/three-dimension-space/position/setObjectPosition");
const lights_consts_1 = require("../lights.consts");
const lights_default_1 = require("../lights.default");
const PointLightElement = ({ name, color, intensity = lights_default_1.DEFAULT_LIGHT_INTENSITY, position = threejs_1.DEFAULT_VECTOR_POSITION, }) => {
    const pointLight = new three_1.PointLight(color !== null && color !== void 0 ? color : lights_consts_1.DEFAULT_LIGHT_COLOR);
    (0, setObjectPosition_1.setObjectPosition)(pointLight, position);
    pointLight.name = name;
    pointLight.intensity = intensity;
    return pointLight;
};
exports.PointLightElement = PointLightElement;
