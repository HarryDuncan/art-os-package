import { VertexEffectConfig } from "../../../../../../types/materials/index";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData, VertexEffectProps } from "../vertexEffects.types";
// import { explode } from "./displacement/explode/explode";
// import { interactionBased } from "./interaction-based/interactionBased";

// import { rotationEffect } from "./rotation-effects/rotationEffect";
import { imageToPointsTransformConfig } from "./image-vertex-effects/image-to-points/imageToPoints.consts";
import { generateVertexShaderTransformation } from "../../helpers/generateTransform";

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
    generateVertexShaderTransformation(transformationConfig, effectProps);

  return {
    transformation,
    requiredFunctions: transformationFunctions,
  };
};
