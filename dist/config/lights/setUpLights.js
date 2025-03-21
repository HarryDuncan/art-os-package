import { AmbientLightElement } from "./light-elements/AmbientLightElement";
import { DirectionalLightElement } from "./light-elements/DirectionalLightElement";
import { PointLightElement } from "./light-elements/PointLightElement";
import { LIGHT_TYPES } from "./lights.types";
export const setUpLights = (lightConfigs = []) => lightConfigs.flatMap(({ name, lightType, props }) => {
    switch (lightType) {
        case LIGHT_TYPES.AMBIENT: {
            const { color } = props !== null && props !== void 0 ? props : {};
            return AmbientLightElement({ name, color });
        }
        case LIGHT_TYPES.POINT_LIGHT: {
            const { color, position } = props !== null && props !== void 0 ? props : {};
            return PointLightElement({ name, color, position });
        }
        case LIGHT_TYPES.DIRECTIONAL_LIGHT: {
            const { color, position } = props !== null && props !== void 0 ? props : {};
            return DirectionalLightElement({ name, color, position });
        }
        default:
            console.warn("no light has been configured for this light type");
            return [];
    }
});
