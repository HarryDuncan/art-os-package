import { Vector3 } from "three";
import { DEFAULT_LIGHTS } from "./lights.default";
import { setUpLights } from "./setUpLights";
export const getLightsFromConfig = (config) => {
    const { lightConfig } = config;
    if (!lightConfig) {
        console.warn("no light config found - return default light config");
        return setUpLights(DEFAULT_LIGHTS);
    }
    const formattedConfigs = lightConfig.map(({ name, lightType, props }) => {
        const light = { name, lightType, props: {} };
        const lightProps = Object.assign({}, props);
        if (props && props.position) {
            const { x, y, z } = props.position;
            lightProps.position = new Vector3(x, y, z);
        }
        light.props = lightProps;
        return light;
    });
    return setUpLights(formattedConfigs);
};
