import { randomFloat } from "display/materials/webgl-shaders/shader-functions/random/random";
import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import {
  AttributeConfig,
  ExplodeEffectProps,
  InteractiveEffectProps,
  UniformConfig,
  VaryingConfig,
} from "../../../types";
import {
  VERTEX_EFFECTS,
  VERTEX_EFFECT_POINT_NAMES,
} from "../../vertexEffects.consts";
import { explode } from "../displacement/explode/explode";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { VertexEffectData } from "../../vertexEffects.types";
import { DEFAULT_VERTEX_EFFECT } from "../../../constants";

export const interactiveEffect = (
  previousPointName: string,
  effectProps: InteractiveEffectProps
) => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.INTERACTED_POINT;
  const uniformConfig = {
    defaultUniforms: ["uPosition", "uStrength"],
    customUniforms: [],
  } as UniformConfig;
  const varyingConfig = [
    {
      id: "vAffected",
      valueType: "FLOAT",
      varyingType: "CUSTOM",
      value: "isAffected",
    },
  ] as VaryingConfig[];
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    vertexPointInstantiation,
  } = getEffectData(pointName, effectProps);
  const transformation = `
  // uPosition will be set to 2000 is there is no detections made
  // Convert screen coordinates to NDC
  vec2 ndcCoords = (uPosition.xy - 0.5) * 2.0;
  // Assuming zero depth for simplicity
  vec3 ndcPosition = vec3(ndcCoords, 0.0);
  vec3 ${pointName} = ${previousPointName}.xyz;
  float isAffected = 0.0;
  ${vertexPointInstantiation};
  if( ndcPosition.x > -2000.0){
    ${effectTransformation}
  } `;
  const requiredFunctions = [
    { id: "randomFloat", functionDefinition: randomFloat },
  ];
  const attributeConfig = [
    { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
  ] as AttributeConfig[];

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
    pointName: effectPointName,
  };
};

const getEffectData = (
  pointName: string,
  interactiveEffectProps: InteractiveEffectProps
): VertexEffectData => {
  const { effectType, effectProps } = interactiveEffectProps;
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE:
      return explode(pointName, effectProps as Partial<ExplodeEffectProps>);
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
