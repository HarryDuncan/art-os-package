import { AmbientLight as ThreeAmbientLight } from "three";
import { AmbientLightConfig } from "../lights.types";
import { DEFAULT_LIGHT_COLOR } from "../lights.consts";
import { DEFAULT_LIGHT_INTENSITY } from "../lights.default";

export interface AmbientLightParameters extends AmbientLightConfig {
  name: string;
}
export const AmbientLightElement = ({
  name,
  color,
  intensity = DEFAULT_LIGHT_INTENSITY,
}: AmbientLightParameters) => {
  const ambientLight = new ThreeAmbientLight(color ?? DEFAULT_LIGHT_COLOR);
  ambientLight.intensity = intensity;
  ambientLight.name = name;
  return ambientLight;
};
