import { RotationEffectProps } from "../../../types";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import {
  DEFAULT_ROTATION_EFFECT_CONFIG,
  ROTATION_ATTRIBUTES,
  ROTATION_VARYINGS,
} from "./rotation.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { rotationTransform } from "./rotationTransform";

export const rotationEffect = (
  effectProps: Partial<RotationEffectProps> = {}
): VertexEffectData => {
  const formattedProps = formatVertexParameters(
    effectProps,
    DEFAULT_ROTATION_EFFECT_CONFIG as RotationEffectProps
  ) as RotationEffectProps;

  const { uniformConfig, requiredFunctions, transformation } =
    rotationTransform(formattedProps);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig: ROTATION_VARYINGS,
    attributeConfig: ROTATION_ATTRIBUTES,
  };
};
