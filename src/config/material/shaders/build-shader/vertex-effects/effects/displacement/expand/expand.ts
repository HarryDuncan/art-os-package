import {
  UniformConfig,
  AttributeConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";
import { ExpandEffectProps } from "../../../../../../../../types/materials/shaders/vertexShader.types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  EXPAND_UNIFORMS,
  EXPAND_VARYINGS,
  EXPAND_FUNCTIONS,
  DEFAULT_EXPAND_PARAMETERS,
} from "./expand.consts";
import { expandTransformation } from "./expandTransformation";

export const expand = (
  effectProps: Partial<ExpandEffectProps>
): VertexEffectData => {
  const expandEffectProps = formatVertexParameters(
    effectProps ?? {},
    DEFAULT_EXPAND_PARAMETERS
  ) as ExpandEffectProps;

  const uniformConfig = EXPAND_UNIFORMS as UniformConfig;
  const varyingConfig = EXPAND_VARYINGS;
  const { transformation } = expandTransformation(expandEffectProps);
  const requiredFunctions = EXPAND_FUNCTIONS;
  const attributeConfig = [] as AttributeConfig[];

  return {
    attributeConfig,
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
  };
};
