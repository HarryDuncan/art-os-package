import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import {
  AttributeConfig,
  ShaderFunction,
  TriggeredVertexEffect,
  TriggeredVertexEffectProps,
} from "../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import {
  DEFAULT_TRIGGERED_EFFECT,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";

import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { triggeredEffectTransform } from "./triggeredEffectTransform";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";

export const triggeredEffect = (
  previousPointName: string,
  effectProps: TriggeredVertexEffect
) => {
  const triggeredEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_TRIGGERED_EFFECT as TriggeredVertexEffectProps
  ) as TriggeredVertexEffect;
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.TRIGGERED_POINT,
    POINT_PARENTS.TRIGGERED
  );
  const uniformConfig = TRIGGERED_UNIFORM_CONFIG;
  const varyingConfig = TRIGGERED_VARYING_CONFIG;
  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
  } = triggeredEffectTransform(
    pointName,
    previousPointName,
    triggeredEffectProps
  );

  const requiredFunctions: ShaderFunction[] = [];
  const attributeConfig = [] as AttributeConfig[];

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
