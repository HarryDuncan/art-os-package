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
import { mergeShaderFunctions } from "./mergeShaderFunctions";

export const mergeEffectData = (
  effectData: FragmentEffectData | VertexEffectData,
  effectType: string,
  shaderType: string
) => {
  const {
    transformation,
    requiredFunctions,
    uniformConfigs,
    varyingConfigs,
    attributeConfigs,
  } = effectData;

  const defaultEffectData =
    shaderType === SHADER_TYPES.FRAGMENT
      ? FRAGMENT_EFFECT_CONFIG_MAP[effectType]
      : VERTEX_EFFECT_CONFIG_MAP[effectType];

  const defaultVaryingData = defaultEffectData?.varyings ?? [];
  const mergedUniforms = mergeUniformConfigs([
    uniformConfigs,
    defaultEffectData.uniforms,
  ]);
  const mergedVaryings = mergeVaryingConfigs([
    varyingConfigs,
    defaultVaryingData,
  ]);
  const mergedAttributes = mergeAttributeConfigs([
    attributeConfigs,
    defaultEffectData.attributes,
  ]);
  const mergedFunctions = mergeShaderFunctions([
    requiredFunctions,
    defaultEffectData?.functions,
  ]);

  return {
    transformation,
    requiredFunctions: mergedFunctions,
    uniformConfigs: mergedUniforms,
    varyingConfigs: mergedVaryings,
    attributeConfigs: mergedAttributes,
  };
};
