"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFragmentEffect = void 0;
const uniforms_consts_1 = require("../../../shader-properties/uniforms/uniforms.consts");
const defaultFragmentEffect = () => {
    const uniformConfig = Object.assign({}, uniforms_consts_1.EMPTY_UNIFORM_CONFIG);
    const defaultFrag = ``;
    return {
        requiredFunctions: [],
        uniformConfig,
        transformation: defaultFrag,
        varyingConfig: [],
        attributeConfig: [],
    };
};
exports.defaultFragmentEffect = defaultFragmentEffect;
