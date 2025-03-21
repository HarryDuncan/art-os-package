import { DEFAULT_VECTOR_POSITION } from "../../../consts/threejs";
import { PointLight as ThreePointLight } from "three";
import { setObjectPosition } from "../../../utils/three-dimension-space/position/setObjectPosition";
import { DEFAULT_LIGHT_COLOR } from "../lights.consts";
import { DEFAULT_LIGHT_INTENSITY } from "../lights.default";
export const PointLightElement = ({ name, color, intensity = DEFAULT_LIGHT_INTENSITY, position = DEFAULT_VECTOR_POSITION, }) => {
    const pointLight = new ThreePointLight(color !== null && color !== void 0 ? color : DEFAULT_LIGHT_COLOR);
    setObjectPosition(pointLight, position);
    pointLight.name = name;
    pointLight.intensity = intensity;
    return pointLight;
};
