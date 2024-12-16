import { Vector3 } from "three";
import { DEFAULT_LIGHTS } from "./lights.default";
import { SceneConfig } from "../config.types";
import { setUpLights } from "./setUpLights";
import { SceneLight } from "./lights.types";

export const getLightsFromConfig = (config: SceneConfig): SceneLight[] => {
  const { lightConfig } = config;
  if (!lightConfig) {
    console.warn("no light config found - return default light config");
    return setUpLights(DEFAULT_LIGHTS);
  }
  const formattedConfigs = lightConfig.map(({ name, lightType, props }) => {
    const light = { name, lightType, props: {} };
    const lightProps = { ...props };
    if (props && props.position) {
      const { x, y, z } = props.position;
      lightProps.position = new Vector3(x, y, z);
    }
    light.props = lightProps;
    return light;
  });
  return setUpLights(formattedConfigs);
};
