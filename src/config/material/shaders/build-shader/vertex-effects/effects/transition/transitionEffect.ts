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
import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { transitionEffectTransform } from "./transitionEffectTransform";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import {
  DEFAULT_TRANSITION_EFFECT,
  TRANSITION_UNIFORM_CONFIG,
  TRANSITION_VARYING_CONFIG,
} from "./transitonEffect.consts";

export const transitionEffect = (
  previousPointName: string,
  effectProps: TriggeredVertexEffect
) => {
  const transitionEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_TRANSITION_EFFECT as TriggeredVertexEffectProps
  ) as TriggeredVertexEffect;
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.TRANSITION_POINT,
    POINT_PARENTS.TRANSITION
  );
  const uniformConfig = TRANSITION_UNIFORM_CONFIG;
  const varyingConfig = TRANSITION_VARYING_CONFIG;
  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
  } = transitionEffectTransform(
    pointName,
    previousPointName,
    transitionEffectProps
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
