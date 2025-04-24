import { AmbientLightElement } from "./light-elements/AmbientLightElement";
import { DirectionalLightElement } from "./light-elements/DirectionalLightElement";
import { PointLightElement } from "./light-elements/PointLightElement";
import { LightConfigs, SceneLight } from "../../types";
import { DEFAULT_LIGHT_COLOR, LIGHT_TYPES } from "../../consts/lights/lights";
export const setUpLights = (lightConfigs: LightConfigs[] = []): SceneLight[] =>
  lightConfigs.flatMap(({ name, lightType, props }) => {
    switch (lightType) {
      case LIGHT_TYPES.AMBIENT: {
        const { color } = props ?? { color: DEFAULT_LIGHT_COLOR };
        return AmbientLightElement({ name, color });
      }

      case LIGHT_TYPES.POINT_LIGHT: {
        const { color, position } = props ?? {};
        return PointLightElement({ name, color, position });
      }

      case LIGHT_TYPES.DIRECTIONAL_LIGHT: {
        const { color, position } = props ?? {};
        return DirectionalLightElement({ name, color, position });
      }

      default:
        console.warn("no light has been configured for this light type");
        return [];
    }
  });
