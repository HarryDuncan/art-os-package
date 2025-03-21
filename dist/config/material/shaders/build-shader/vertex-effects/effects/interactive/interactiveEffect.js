import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import { VERTEX_EFFECTS, VERTEX_POINT_NAME } from "../../vertexEffects.consts";
import { explode } from "../displacement/explode/explode";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { randomFloat } from "../../../shader-properties/functions/random/random";
export const interactiveEffect = (effectProps) => {
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
  vec3 ${VERTEX_POINT_NAME} = ${VERTEX_POINT_NAME}.xyz;
  float isAffected = 0.0;
  
  if( ndcPosition.x > -2000.0){
    ${effectTransformation}
  } `;
    const requiredFunctions = [
        { id: "randomFloat", functionDefinition: randomFloat },
    ];
    const attributeConfig = [
        { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
    ];
    const mergedUniformConfigs = mergeUniformConfigs([
        effectUniforms,
        uniformConfig,
    ]);
    const mergedVaryingConfigs = mergeVaryingConfigs([
        effectVaryings,
        varyingConfig,
    ]);
    const mergedRequiredFunction = reduceFunctions([
        effectFunctions,
        requiredFunctions,
    ]);
    const mergedAttributeConfigs = mergeAttributeConfigs([
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
const getEffectData = (interactiveEffectProps) => {
    const { effectType, effectProps } = interactiveEffectProps;
    switch (effectType) {
        case VERTEX_EFFECTS.EXPLODE:
            return explode(effectProps);
        default:
            return Object.assign({}, DEFAULT_VERTEX_EFFECT);
    }
};
