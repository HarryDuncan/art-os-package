import { VertexEffectConfig } from "../../../../../../types/materials/index";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData, VertexEffectProps } from "../vertexEffects.types";
import { SHADER_TYPES } from "../../constants";
import { mergeEffectData } from "../../helpers/mergeEffectData";
// import { explode } from "./displacement/explode/explode";
// import { interactionBased } from "./interaction-based/interactionBased";

// import { rotationEffect } from "./rotation-effects/rotationEffect";
import { imageToPointsTransformConfig } from "./image-vertex-effects/image-to-points/imageToPoints.consts";
import { generateShaderTransformation } from "../../helpers/generateTransform";

const VERTEX_EFFECT_TRANSFORMATION_CONFIGS = {
  // [VERTEX_EFFECTS.EXPLODE]: explode,
  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: imageToPointsTransformConfig,
  //  [VERTEX_EFFECTS.AFFECTED_POSITION]: interactionBased,
  // [VERTEX_EFFECTS.ROTATION]: rotationEffect,
};
export const getVertexEffect = (
  effect: VertexEffectConfig
): VertexEffectData | null => {
  const { effectType, effectParameters, id } = effect;

  const vertexEffectProps = {
    id,
    effectType,
    effectParameters,
    subEffects: effect?.subEffects ?? [],
  };
  return transformSetup(vertexEffectProps);
};

export const transformSetup = (effectProps: VertexEffectProps) => {
  const { effectType } = effectProps;

  const transformationConfig = VERTEX_EFFECT_TRANSFORMATION_CONFIGS[effectType];
  if (!transformationConfig) {
    console.warn(
      `no vertex transformations configured for ${String(effectType)}`
    );
    return null;
  }
  const { transformationFunctions, transformation } =
    generateShaderTransformation(transformationConfig, effectProps);

  console.log(transformation);
  console.log(transformationFunctions);

  const effectData = formatVertexEffectData({
    requiredFunctions: transformationFunctions,
    transformation,
  });
  return mergeEffectData(effectData, effectType, SHADER_TYPES.VERTEX);
};

export const formatVertexEffectData = (effect: Partial<VertexEffectData>) => {
  const {
    attributeConfigs,
    requiredFunctions,
    transformation,
    uniformConfigs,
    varyingConfigs,
  } = effect;
  return {
    attributeConfigs: attributeConfigs ?? [],
    transformation: transformation ?? "",
    requiredFunctions: requiredFunctions ?? [],
    uniformConfigs: uniformConfigs ?? [],
    varyingConfigs: varyingConfigs ?? [],
  };
};
