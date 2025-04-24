import {
  VaryingConfig,
  AttributeConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";
import { NoiseEffectProps } from "../../../../../../../../types/materials/shaders/vertexShader.types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";

import { VertexEffectData } from "../../../vertexEffects.types";
import { DEFAULT_NOISE_PARAMETERS, NOISE_VARYINGS } from "./noise.consts";
import { noiseTransform } from "./noiseTransform";

export const noise = (
  effectProps: Partial<NoiseEffectProps> | undefined
): VertexEffectData => {
  const noiseEffectProps = formatVertexParameters(
    effectProps ?? {},
    DEFAULT_NOISE_PARAMETERS as NoiseEffectProps
  ) as NoiseEffectProps;

  const varyingConfig = NOISE_VARYINGS as VaryingConfig[];
  const { transformation, requiredFunctions, uniformConfig } =
    noiseTransform(noiseEffectProps);

  const attributeConfig = [] as AttributeConfig[];

  return {
    attributeConfig,
    requiredFunctions,
    // @ts-ignore
    uniformConfig,
    transformation,
    varyingConfig,
  };
};
