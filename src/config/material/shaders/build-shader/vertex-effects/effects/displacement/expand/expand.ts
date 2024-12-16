import {
  AttributeConfig,
  ExpandEffectProps,
  UniformConfig,
} from "../../../../types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { generateUniquePointName } from "../../../../helpers/generateUniquePointName";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  EXPAND_UNIFORMS,
  EXPAND_VARYINGS,
  EXPAND_FUNCTIONS,
  DEFAULT_EXPAND_PARAMETERS,
} from "./expand.consts";
import { expandTransformation } from "./expandTransformation";

export const expand = (
  previousPointName: string,
  effectProps: Partial<ExpandEffectProps>
): VertexEffectData => {
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.EXPANDED_POINT,
    effectProps.pointParent
  );
  const expandEffectProps = formatVertexParameters(
    effectProps ?? {},
    DEFAULT_EXPAND_PARAMETERS
  ) as ExpandEffectProps;

  const uniformConfig = EXPAND_UNIFORMS as UniformConfig;
  const varyingConfig = EXPAND_VARYINGS;
  const { transformation, vertexPointInstantiation } = expandTransformation(
    previousPointName,
    pointName,
    expandEffectProps
  );
  const requiredFunctions = EXPAND_FUNCTIONS;
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
