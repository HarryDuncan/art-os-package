// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { SHADER_TYPES } from "../constants";
import { FRAGMENT_EFFECT_CONFIG_MAP } from "../fragment-effects/fragmentEffects.consts";
import { FragmentEffectData } from "../fragment-effects/fragmentShader.types";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VERTEX_EFFECT_CONFIG_MAP } from "../vertex-effects/vertexEffects.consts";
import { VertexEffectData } from "../vertex-effects/vertexEffects.types";
import { reduceFunctions } from "./reduceFunctions";

export const mergeEffectData = (
  effectData: FragmentEffectData | VertexEffectData,
  effectType: string,
  shaderType: string
) => {
  const {
    transformation,
    requiredFunctions,
    uniformConfig,
    varyingConfig,
    attributeConfig,
  } = effectData;

  const defaultEffectData =
    shaderType === SHADER_TYPES.FRAGMENT
      ? FRAGMENT_EFFECT_CONFIG_MAP[effectType]
      : VERTEX_EFFECT_CONFIG_MAP[effectType];

  const defaultVaryingData = defaultEffectData?.varyings ?? [];
  const mergedUniforms = mergeUniformConfigs([
    uniformConfig,
    defaultEffectData.uniforms,
  ]);
  const mergedVaryings = mergeVaryingConfigs([
    varyingConfig,
    defaultVaryingData,
  ]);
  const mergedAttributes = mergeAttributeConfigs([
    attributeConfig,
    defaultEffectData.attributes,
  ]);
  const mergedFunctions = reduceFunctions([
    requiredFunctions,
    defaultEffectData?.functions,
  ]);

  return {
    transformation,
    requiredFunctions: mergedFunctions,
    uniformConfig: mergedUniforms,
    varyingConfig: mergedVaryings,
    attributeConfig: mergedAttributes,
  };
};
