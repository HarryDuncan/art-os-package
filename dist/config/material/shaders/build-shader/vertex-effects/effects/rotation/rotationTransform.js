"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotationTransform = void 0;
const position_types_1 = require("../../../../../../../utils/three-dimension-space/position/position.types");
const rotation_1 = require("../../../shader-properties/functions/rotation/rotation");
const rotation_consts_1 = require("./rotation.consts");
const shaderConversions_1 = require("../../../../../../../utils/conversion/shaderConversions");
const vertexEffectToEffectData_1 = require("../../../helpers/vertexEffectToEffectData");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const getFunctionName = (axis) => {
    switch (axis) {
        case position_types_1.AXIS.X:
            return "rotateX";
        case position_types_1.AXIS.Y:
            return "rotateY";
        case position_types_1.AXIS.Z:
        default:
            return "rotateZ";
    }
};
const getRequiredFunctions = (axis) => {
    switch (axis) {
        case position_types_1.AXIS.X:
            return [{ id: "rotateX", functionDefinition: rotation_1.rotateX }];
        case position_types_1.AXIS.Y:
            return [{ id: "rotateY", functionDefinition: rotation_1.rotateY }];
        case position_types_1.AXIS.Z:
        default:
            return [{ id: "rotateZ", functionDefinition: rotation_1.rotateZ }];
    }
};
const rotationTransform = (rotationEffect) => {
    const { uniformConfig, requiredFunctions, transformation } = getRotationEffect(rotationEffect);
    return {
        uniformConfig,
        requiredFunctions,
        transformation,
    };
};
exports.rotationTransform = rotationTransform;
const getRotationEffect = (rotationEffectProps) => {
    const { effectType, axis, speed, degrees } = rotationEffectProps;
    switch (effectType) {
        case rotation_consts_1.ROTATION_EFFECT_TYPES.ROTATION_BY_DEGREES: {
            const requiredFunctions = getRequiredFunctions(axis);
            const transformation = `
      
        mat4 rotationMatrixByTime = ${getFunctionName(axis)}(${(0, shaderConversions_1.shaderSafeFloat)(degrees !== null && degrees !== void 0 ? degrees : 0)});
        ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME} * rotationMatrixByTime; 
        ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} = ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} * rotationalMatrixByTime;
      `;
            return (0, vertexEffectToEffectData_1.vertexEffectToEffectData)({
                transformation,
                requiredFunctions,
            });
        }
        case rotation_consts_1.ROTATION_EFFECT_TYPES.ROTATION_BY_TIME:
        default: {
            const uniformConfig = Object.assign(Object.assign({}, rotation_consts_1.ROTATION_UNIFORMS), { customUniforms: rotation_consts_1.ROTATION_UNIFORMS.customUniforms.map((uniformConfig) => uniformConfig.id === "uRotationSpeed"
                    ? Object.assign(Object.assign({}, uniformConfig), { value: speed }) : uniformConfig) });
            const requiredFunctions = getRequiredFunctions(axis);
            const transformation = `
       
        float rotationAngle = uTime * uRotationSpeed;
        mat4 rotationMatrix = ${getFunctionName(axis)}(rotationAngle);
        ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME} * rotationMatrix; 
        ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} = ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} * rotationMatrix;
        `;
            return {
                transformation,
                requiredFunctions,
                uniformConfig,
            };
        }
    }
};
