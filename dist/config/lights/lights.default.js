"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIGHTS = exports.DEFAULT_LIGHT_INTENSITY = void 0;
const lights_types_1 = require("./lights.types");
exports.DEFAULT_LIGHT_INTENSITY = 1.0;
exports.DEFAULT_LIGHTS = [
    {
        name: "ambient-light",
        lightType: lights_types_1.LIGHT_TYPES.AMBIENT,
        props: { intensity: 1.0 },
    },
    {
        name: "point-light",
        lightType: lights_types_1.LIGHT_TYPES.POINT_LIGHT,
        props: { color: "#ffffff" },
    },
    {
        name: "directional-light",
        lightType: lights_types_1.LIGHT_TYPES.DIRECTIONAL_LIGHT,
        props: { color: "#ffffff" },
    },
];
