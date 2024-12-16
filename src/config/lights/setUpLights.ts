import { AmbientLightElement } from "display/scene-elements/lights/AmbientLightElement";
import { DirectionalLightElement } from "display/scene-elements/lights/DirectionalLightElement";
import { PointLightElement } from "display/scene-elements/lights/PointLightElement";
import {
  LIGHT_TYPES,
  LightConfigs,
  SceneLight,
} from "display/scene-elements/lights/lights.types";

export const setUpLights = (lightConfigs: LightConfigs[] = []): SceneLight[] =>
  lightConfigs.flatMap(({ name, lightType, props }) => {
    switch (lightType) {
      case LIGHT_TYPES.AMBIENT: {
        const { color } = props ?? {};
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
