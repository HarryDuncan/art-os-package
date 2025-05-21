import { VertexEffectData, VertexEffectProps } from "../../vertexEffects.types";
import {
  ROTATION_FUNCTIONS,
  ROTATION_UNIFORMS,
  ROTATION_VARYINGS,
} from "./rotationEffect.consts";
import { rotationTransform } from "./rotationTransform";

export const rotationEffect = (
  effectProps: VertexEffectProps
): VertexEffectData | null => {
  const { effectUniforms } = effectProps;
  const transformation = rotationTransform(effectUniforms);
  const requiredFunctions = ROTATION_FUNCTIONS;
  const varyingConfig = ROTATION_VARYINGS;

  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig: ROTATION_UNIFORMS,
    transformation,
    varyingConfig,
  };
};
