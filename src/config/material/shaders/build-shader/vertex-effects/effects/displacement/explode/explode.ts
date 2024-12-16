import { ShaderPropertyValueTypes } from "../../../../constants/buildShader.consts";
import {
  AttributeConfig,
  ExplodeEffectProps,
  UniformConfig,
} from "../../../../types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  DEFAULT_EXPLODE_PARAMETERS,
  EXPLODE_FUNCTIONS,
  EXPLODE_UNIFORMS,
  EXPLODE_VARYINGS,
} from "./explode.consts";
import { explodeTransform } from "./explodeTransform";

export const explode = (
  previousPointName: string,
  effectProps: Partial<ExplodeEffectProps> | undefined
): VertexEffectData => {
  const explodeEffectProps = formatVertexParameters(
    effectProps ?? {},
    DEFAULT_EXPLODE_PARAMETERS as ExplodeEffectProps
  ) as ExplodeEffectProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.EXPLODED_POINT;
  const uniformConfig = EXPLODE_UNIFORMS as UniformConfig;
  const varyingConfig = EXPLODE_VARYINGS;
  const transformation = explodeTransform(
    previousPointName,
    pointName,
    explodeEffectProps
  );
  const requiredFunctions = EXPLODE_FUNCTIONS;
  const attributeConfig = [
    { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "signDirection", valueType: ShaderPropertyValueTypes.FLOAT },
  ] as AttributeConfig[];
  const vertexPointInstantiation = `vec3 ${pointName} = ${previousPointName}.xyz;`;
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
