import { DEFAULT_VECTOR_POSITION } from "../../../consts/threejs";
import { DirectionalLight as ThreeDirectionalLight } from "three";
import { setObjectPosition } from "../../../utils/three-dimension-space/position/setObjectPosition";
import { DEFAULT_LIGHT_COLOR } from "../../../consts/lights/lights";
import { DirectionalLightConfig } from "../../../types";

interface DirectionalLightParameters extends DirectionalLightConfig {
  name: string;
}
export const DirectionalLightElement = ({
  name,
  color,
  position = DEFAULT_VECTOR_POSITION,
}: DirectionalLightParameters) => {
  const light = new ThreeDirectionalLight(color ?? DEFAULT_LIGHT_COLOR);
  setObjectPosition(light, position);
  light.intensity = 1;
  light.name = name;
  return light;
};
