import { DEFAULT_VECTOR_POSITION } from "../../../consts/threejs";
import { PointLight as ThreePointLight } from "three";
import { setObjectPosition } from "../../../utils/three-dimension-space/position/setObjectPosition";
import {
  DEFAULT_LIGHT_INTENSITY,
  DEFAULT_LIGHT_COLOR,
} from "../../../consts/lights/lights";
import { PointLightConfig } from "../../../types";

interface PointLightParameters extends PointLightConfig {
  name: string;
}
export const PointLightElement = ({
  name,
  color,
  intensity = DEFAULT_LIGHT_INTENSITY,
  position = DEFAULT_VECTOR_POSITION,
}: PointLightParameters) => {
  const pointLight = new ThreePointLight(color ?? DEFAULT_LIGHT_COLOR);
  setObjectPosition(pointLight, position);
  pointLight.name = name;
  pointLight.intensity = intensity;
  return pointLight;
};
