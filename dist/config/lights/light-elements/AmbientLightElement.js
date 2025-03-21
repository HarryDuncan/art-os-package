"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbientLightElement = void 0;
const three_1 = require("three");
const lights_consts_1 = require("../lights.consts");
const lights_default_1 = require("../lights.default");
const AmbientLightElement = ({ name, color, intensity = lights_default_1.DEFAULT_LIGHT_INTENSITY, }) => {
    const ambientLight = new three_1.AmbientLight(color !== null && color !== void 0 ? color : lights_consts_1.DEFAULT_LIGHT_COLOR);
    ambientLight.intensity = intensity;
    ambientLight.name = name;
    return ambientLight;
};
exports.AmbientLightElement = AmbientLightElement;
