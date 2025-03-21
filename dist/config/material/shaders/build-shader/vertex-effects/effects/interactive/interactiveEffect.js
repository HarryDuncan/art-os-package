"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveEffect = void 0;
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const explode_1 = require("../displacement/explode/explode");
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const constants_1 = require("../../../constants");
const random_1 = require("../../../shader-properties/functions/random/random");
const interactiveEffect = (effectProps) => {
    const uniformConfig = {
        defaultUniforms: ["uPosition", "uStrength"],
        customUniforms: [],
    };
    const varyingConfig = [
        {
            id: "vAffected",
            valueType: "FLOAT",
            varyingType: "CUSTOM",
            value: "isAffected",
        },
    ];
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectProps);
    const transformation = `
  // uPosition will be set to 2000 is there is no detections made
  // Convert screen coordinates to NDC
  vec2 ndcCoords = (uPosition.xy - 0.5) * 2.0;
  // Assuming zero depth for simplicity
  vec3 ndcPosition = vec3(ndcCoords, 0.0);
  vec3 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;
  float isAffected = 0.0;
  
  if( ndcPosition.x > -2000.0){
    ${effectTransformation}
  } `;
    const requiredFunctions = [
        { id: "randomFloat", functionDefinition: random_1.randomFloat },
    ];
    const attributeConfig = [
        { id: "randomAngle", valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT },
    ];
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        effectUniforms,
        uniformConfig,
    ]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        effectVaryings,
        varyingConfig,
    ]);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)([
        effectFunctions,
        requiredFunctions,
    ]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        attributeConfig,
        effectAttributes,
    ]);
    return {
        requiredFunctions: mergedRequiredFunction,
        uniformConfig: mergedUniformConfigs,
        attributeConfig: mergedAttributeConfigs,
        transformation,
        varyingConfig: mergedVaryingConfigs,
    };
};
exports.interactiveEffect = interactiveEffect;
const getEffectData = (interactiveEffectProps) => {
    const { effectType, effectProps } = interactiveEffectProps;
    switch (effectType) {
        case vertexEffects_consts_1.VERTEX_EFFECTS.EXPLODE:
            return (0, explode_1.explode)(effectProps);
        default:
            return Object.assign({}, constants_1.DEFAULT_VERTEX_EFFECT);
    }
};
