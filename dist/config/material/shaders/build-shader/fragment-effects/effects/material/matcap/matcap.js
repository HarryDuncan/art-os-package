"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcapMaterial = void 0;
const matcap_consts_1 = require("./matcap.consts");
const formatFragmentParameters_1 = require("../../../../helpers/formatFragmentParameters");
const matcapTransform_1 = require("./matcapTransform");
const matcapMaterial = (effectProps = {}) => {
    const formattedProps = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, matcap_consts_1.DEFAULT_MATCAP_EFFECT_PROPS);
    const { transform } = (0, matcapTransform_1.matcapTransform)(formattedProps);
    const uniformConfig = matcap_consts_1.DEFAULT_MATCAP_UNIFORMS;
    const varyingConfig = matcap_consts_1.MATCAP_VARYINGS;
    const requiredFunctions = matcap_consts_1.MATCAP_REQUIRED_FUNCTIONS;
    return {
        requiredFunctions,
        uniformConfig,
        transformation: transform,
        varyingConfig,
        attributeConfig: [],
    };
};
exports.matcapMaterial = matcapMaterial;
