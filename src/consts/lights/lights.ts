import { LightType } from "../../types";

export const LIGHT_TYPES = {
  AMBIENT: "AMBIENT",
  POINT_LIGHT: "POINT_LIGHT",
  DIRECTIONAL_LIGHT: "DIRECTIONAL_LIGHT",
};

export const DEFAULT_LIGHT_INTENSITY = 1.0;
export const DEFAULT_LIGHT_COLOR = "#ffffff";
export const DEFAULT_LIGHTS = [
  {
    name: "ambient-light",
    lightType: LIGHT_TYPES.AMBIENT as LightType,
    props: { intensity: 1.0 },
  },
  {
    name: "point-light",
    lightType: LIGHT_TYPES.POINT_LIGHT as LightType,
    props: { color: "#ffffff" },
  },
  {
    name: "directional-light",
    lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT as LightType,
    props: { color: "#ffffff" },
  },
];
