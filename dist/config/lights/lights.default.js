import { LIGHT_TYPES } from "./lights.types";
export const DEFAULT_LIGHT_INTENSITY = 1.0;
export const DEFAULT_LIGHTS = [
    {
        name: "ambient-light",
        lightType: LIGHT_TYPES.AMBIENT,
        props: { intensity: 1.0 },
    },
    {
        name: "point-light",
        lightType: LIGHT_TYPES.POINT_LIGHT,
        props: { color: "#ffffff" },
    },
    {
        name: "directional-light",
        lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT,
        props: { color: "#ffffff" },
    },
];
