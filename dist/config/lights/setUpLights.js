"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpLights = void 0;
const AmbientLightElement_1 = require("./light-elements/AmbientLightElement");
const DirectionalLightElement_1 = require("./light-elements/DirectionalLightElement");
const PointLightElement_1 = require("./light-elements/PointLightElement");
const lights_types_1 = require("./lights.types");
const setUpLights = (lightConfigs = []) => lightConfigs.flatMap(({ name, lightType, props }) => {
    switch (lightType) {
        case lights_types_1.LIGHT_TYPES.AMBIENT: {
            const { color } = props !== null && props !== void 0 ? props : {};
            return (0, AmbientLightElement_1.AmbientLightElement)({ name, color });
        }
        case lights_types_1.LIGHT_TYPES.POINT_LIGHT: {
            const { color, position } = props !== null && props !== void 0 ? props : {};
            return (0, PointLightElement_1.PointLightElement)({ name, color, position });
        }
        case lights_types_1.LIGHT_TYPES.DIRECTIONAL_LIGHT: {
            const { color, position } = props !== null && props !== void 0 ? props : {};
            return (0, DirectionalLightElement_1.DirectionalLightElement)({ name, color, position });
        }
        default:
            console.warn("no light has been configured for this light type");
            return [];
    }
});
exports.setUpLights = setUpLights;
