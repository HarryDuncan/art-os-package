"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expand = void 0;
const formatVertexParameters_1 = require("../../../../helpers/formatVertexParameters");
const expand_consts_1 = require("./expand.consts");
const expandTransformation_1 = require("./expandTransformation");
const expand = (effectProps) => {
    const expandEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps !== null && effectProps !== void 0 ? effectProps : {}, expand_consts_1.DEFAULT_EXPAND_PARAMETERS);
    const uniformConfig = expand_consts_1.EXPAND_UNIFORMS;
    const varyingConfig = expand_consts_1.EXPAND_VARYINGS;
    const { transformation } = (0, expandTransformation_1.expandTransformation)(expandEffectProps);
    const requiredFunctions = expand_consts_1.EXPAND_FUNCTIONS;
    const attributeConfig = [];
    return {
        attributeConfig,
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.expand = expand;
