import {
  VertexEffectConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../types/materials/index";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { imageToPoints } from "./image-vertex-effects/image-to-points/imageToPoints";
import { interactionBased } from "./interaction-based/interactionBased";
import { formatVaryingsForEffect } from "../../helpers/formatVaryingsForEffect";
import { explode } from "./displacement/explode/explode";
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
  const effectFunction = VERTEX_EFFECTS_MAP[effectType];
  if (!effectFunction) {
    console.warn(
      `no vertex transformations configured for ${String(effectType)}`
    );
    return null;
  }
  const vertexEffectProps = {
    effectUniforms,
    effectVaryings,
    effectParameters,
    effectType,
    subEffects: effect?.subEffects ?? [],
    unfilteredUniforms: uniformConfig,
    unfilteredVaryings: varyingConfig,
  };
  return effectFunction(vertexEffectProps);
};
