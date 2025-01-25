import {
  AttributeConfig,
  NoiseEffectProps,
  UniformConfig,
  VaryingConfig,
} from "../../../../types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { DEFAULT_NOISE_PARAMETERS, NOISE_VARYINGS } from "./noise.consts";
import { noiseTransform } from "./noiseTransform";

export const noise = (
  previousPointName: string,
  effectProps: Partial<NoiseEffectProps> | undefined
): VertexEffectData => {
  const noiseEffectProps = formatVertexParameters(
    effectProps ?? {},
    DEFAULT_NOISE_PARAMETERS as NoiseEffectProps
  ) as NoiseEffectProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.NOISE_POINT;

  const varyingConfig = NOISE_VARYINGS as VaryingConfig[];
  const {
    transformation,
    vertexPointInstantiation,
    requiredFunctions,
    uniformConfig,
  } = noiseTransform(previousPointName, pointName, noiseEffectProps);

  const attributeConfig = [] as AttributeConfig[];

  return {
    attributeConfig,
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
    vertexPointInstantiation,
  };
};
