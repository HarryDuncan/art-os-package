"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explode = void 0;
const buildShader_consts_1 = require("../../../../constants/buildShader.consts");
const formatVertexParameters_1 = require("../../../../helpers/formatVertexParameters");
const explode_consts_1 = require("./explode.consts");
const explodeTransform_1 = require("./explodeTransform");
const explode = (effectProps) => {
    const explodeEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps !== null && effectProps !== void 0 ? effectProps : {}, explode_consts_1.DEFAULT_EXPLODE_PARAMETERS);
    const uniformConfig = explode_consts_1.EXPLODE_UNIFORMS;
    const varyingConfig = explode_consts_1.EXPLODE_VARYINGS;
    const transformation = (0, explodeTransform_1.explodeTransform)(explodeEffectProps);
    const requiredFunctions = explode_consts_1.EXPLODE_FUNCTIONS;
    const attributeConfig = [
        { id: "randomAngle", valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT },
        { id: "signDirection", valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT },
    ];
    return {
        attributeConfig,
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.explode = explode;
