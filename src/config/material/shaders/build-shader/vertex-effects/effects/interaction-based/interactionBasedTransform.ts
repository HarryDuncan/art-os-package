import {
  TransformationConfig,
  UniformConfig,
  UniformValueConfig,
  VertexEffectConfig,
} from "../../../../../../..";
import { generateVertexTransformation } from "../../../helpers/generateTransform";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "../getVertexEffect";
import { affectedPositionTransformConfig } from "./interaction-transforms/affectedPosition";

export const interactionTransformConfig = {
  effectName: "interactionTransform",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [],
} as unknown as TransformationConfig;

export const interactionBasedTransform = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  unfilteredUniforms: UniformConfig,
  subEffects: VertexEffectConfig[]
) => {
  console.log("subEffects", subEffects);
  const subEffectData = subEffects.map((subEffect) => {
    const {
      transformation,
      requiredFunctions,
      uniformConfig,
      attributeConfig,
      varyingConfig,
    } = getVertexEffect(subEffect, unfilteredUniforms);
    return {
      transformation,
      requiredFunctions,
      uniformConfig,
      attributeConfig,
      varyingConfig,
    };
  });
  console.log("subEffectData", subEffectData);
  const interactionAffectTransform = getInteractionEffectTransform(effectType);
  const effectCode = [
    ...interactionAffectTransform.effectCode,
    ...subEffectData.map((subEffect) => subEffect.transformation),
    "};",
  ];
  const transformConfig = { ...interactionTransformConfig, effectCode };
  const transformation = generateVertexTransformation(
    transformConfig,
    effectUniforms
  );

  const mergedVaryingConfigs = mergeVaryingConfigs(
    subEffectData.map(({ varyingConfig }) => varyingConfig)
  );
  const mergedRequiredFunction = reduceFunctions(
    subEffectData.map(({ requiredFunctions }) => requiredFunctions)
  );

  return {
    transformation,
    requiredFunctions: mergedRequiredFunction,
    varyingConfig: mergedVaryingConfigs,
  };
};

const INTERACTION_TRANSFORM_MAP = {
  AFFECTED_POSITION: affectedPositionTransformConfig,
};
const getInteractionEffectTransform = (effectType: string) => {
  const transformationConfig =
    INTERACTION_TRANSFORM_MAP[
      effectType as keyof typeof INTERACTION_TRANSFORM_MAP
    ];
  return transformationConfig;
};
