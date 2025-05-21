import {
  VertexEffectConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../types/materials/index";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData, VertexEffectProps } from "../vertexEffects.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { formatVaryingsForEffect } from "../../helpers/formatVaryingsForEffect";
import { SHADER_TYPES } from "../../constants";
import { mergeEffectData } from "../../helpers/mergeEffectData";
import { EMPTY_UNIFORM_CONFIG } from "../../constants/shader.consts";
import { explode } from "./displacement/explode/explode";
import { interactionBased } from "./interaction-based/interactionBased";
import { imageToPoints } from "./image-vertex-effects/image-to-points/imageToPointsTransform";
import { rotationEffect } from "./rotation-effects/rotationEffect";

const VERTEX_EFFECTS_MAP = {
  [VERTEX_EFFECTS.EXPLODE]: explode,
  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: imageToPoints,
  [VERTEX_EFFECTS.AFFECTED_POSITION]: interactionBased,
  [VERTEX_EFFECTS.ROTATION]: rotationEffect,
};
export const getVertexEffect = (
  effect: VertexEffectConfig,
  uniformConfig: UniformConfig,
  varyingConfig: VaryingConfig[]
): VertexEffectData | null => {
  const { effectType, effectParameters, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfig, id);
  const effectVaryings = formatVaryingsForEffect(varyingConfig, id);

  const vertexEffectProps = {
    effectUniforms,
    effectVaryings,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
    unfilteredUniforms: uniformConfig,
    unfilteredVaryings: varyingConfig,
  };
  return transformSetup(vertexEffectProps);
};

export const transformSetup = (effectProps: VertexEffectProps) => {
  const { effectType } = effectProps;
  const effectFunction = VERTEX_EFFECTS_MAP[effectType];
  if (effectFunction) {
    const effectData = formatVertexEffectData(effectFunction(effectProps));
    return mergeEffectData(effectData, effectType, SHADER_TYPES.VERTEX);
  } else {
    console.warn(
      `no vertex transformations configured for ${String(effectType)}`
    );
    return null;
  }
};

export const formatVertexEffectData = (effect: Partial<VertexEffectData>) => {
  const {
    attributeConfig,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    attributeConfig: attributeConfig ?? [],
    transformation: transformation ?? "",
    requiredFunctions: requiredFunctions ?? [],
    uniformConfig: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    varyingConfig: varyingConfig ?? [],
  };
};
