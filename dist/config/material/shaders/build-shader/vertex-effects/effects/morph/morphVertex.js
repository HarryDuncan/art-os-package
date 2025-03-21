import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VERTEX_NORMAL_NAME, VERTEX_POINT_NAME, } from "../../vertexEffects.consts";
import { buildMorphTransforms } from "./buildMorphTransforms";
import { morphTransitions } from "./morph-transitions/morphTransitions";
import { DEFAULT_MORPH_EFFECT_PROPS, DEFAULT_MORPH_VARYING_CONFIG, DEFAULT_UNIFORM_CONFIG, } from "./morphVertex.consts";
import { setUpMorphObjects } from "./setUpMorphObjects";
const getAttributeConfig = (morphCount) => new Array(morphCount).fill("").flatMap((_value, index) => [
    {
        id: `morphPosition${index}`,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
        id: `morphNormal${index}`,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
]);
export const morphVertex = (effectProps = {}) => {
    const formattedProps = formatVertexParameters(effectProps, DEFAULT_MORPH_EFFECT_PROPS);
    const { morphCount, preTransformConfigs, transitionConfig } = formattedProps;
    const attributeConfig = getAttributeConfig(morphCount);
    const { requiredFunctions, morphObjects, transforms } = setUpMorphObjects(morphCount, preTransformConfigs);
    const morphTransitionInfo = transitionConfig
        ? morphTransitions(transitionConfig)
        : null;
    const transformation = `
    vec3 currentPosition = ${VERTEX_POINT_NAME}.xyz;
    vec3 currentNormal = ${VERTEX_NORMAL_NAME}.xyz;
    ${transforms.map((value) => `${value} \n `).join(" \n ")}
    vec3 effect_direction = ${morphObjects[0].pointName} - currentPosition;
    vec3 normal_effect_direction = ${morphObjects[0].normalName} - currentNormal;
    ${buildMorphTransforms(morphObjects)}
    ${VERTEX_POINT_NAME} = vec4(currentPosition + (effect_direction * (uProgress)),1.0);
    ${VERTEX_NORMAL_NAME} = vec4(currentNormal + (normal_effect_direction * (uProgress)), 1.0);
    ${morphTransitionInfo && (morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.transformation)}
   
    `;
    const mergedRequiredFunctions = reduceFunctions([
        requiredFunctions,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.requiredFunctions,
    ]);
    const mergedUniformConfigs = mergeUniformConfigs([
        DEFAULT_UNIFORM_CONFIG,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.uniformConfig,
    ]);
    const mergedVaryingConfigs = mergeVaryingConfigs([
        DEFAULT_MORPH_VARYING_CONFIG,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.varyingConfig,
    ]);
    const mergedAttributeConfigs = mergeAttributeConfigs([
        attributeConfig,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.attributeConfig,
    ]);
    return {
        requiredFunctions: mergedRequiredFunctions,
        uniformConfig: mergedUniformConfigs,
        transformation,
        attributeConfig: mergedAttributeConfigs,
        varyingConfig: mergedVaryingConfigs,
    };
};
