"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLightsFromConfig = void 0;
const three_1 = require("three");
const lights_default_1 = require("./lights.default");
const setUpLights_1 = require("./setUpLights");
const getLightsFromConfig = (config) => {
    const { lightConfig } = config;
    if (!lightConfig) {
        console.warn("no light config found - return default light config");
        return (0, setUpLights_1.setUpLights)(lights_default_1.DEFAULT_LIGHTS);
    }
    const formattedConfigs = lightConfig.map(({ name, lightType, props }) => {
        const light = { name, lightType, props: {} };
        const lightProps = Object.assign({}, props);
        if (props && props.position) {
            const { x, y, z } = props.position;
            lightProps.position = new three_1.Vector3(x, y, z);
        }
        light.props = lightProps;
        return light;
    });
    return (0, setUpLights_1.setUpLights)(formattedConfigs);
};
exports.getLightsFromConfig = getLightsFromConfig;
