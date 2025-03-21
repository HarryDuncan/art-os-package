import { AmbientLight as ThreeAmbientLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "../lights.consts";
import { DEFAULT_LIGHT_INTENSITY } from "../lights.default";
export const AmbientLightElement = ({ name, color, intensity = DEFAULT_LIGHT_INTENSITY, }) => {
    const ambientLight = new ThreeAmbientLight(color !== null && color !== void 0 ? color : DEFAULT_LIGHT_COLOR);
    ambientLight.intensity = intensity;
    ambientLight.name = name;
    return ambientLight;
};
