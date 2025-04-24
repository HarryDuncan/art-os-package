import { AmbientLight as ThreeAmbientLight } from "three";
import {
  DEFAULT_LIGHT_COLOR,
  DEFAULT_LIGHT_INTENSITY,
} from "../../../consts/lights/lights";
import { AmbientLightConfig } from "../../../types";

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
