import { DEFAULT_VECTOR_POSITION } from "../../../consts/threejs";
import { DirectionalLight as ThreeDirectionalLight } from "three";
import { setObjectPosition } from "../../../utils/three-dimension-space/position/setObjectPosition";
import { DEFAULT_LIGHT_COLOR } from "../lights.consts";
export const DirectionalLightElement = ({ name, color, position = DEFAULT_VECTOR_POSITION, }) => {
    const light = new ThreeDirectionalLight(color !== null && color !== void 0 ? color : DEFAULT_LIGHT_COLOR);
    setObjectPosition(light, position);
    light.intensity = 1;
    light.name = name;
    return light;
};
