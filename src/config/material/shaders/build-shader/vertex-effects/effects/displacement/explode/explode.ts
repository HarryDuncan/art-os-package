import {
  AttributeConfig,
  UniformValueConfig,
} from "../../../../../../../../types/materials/index";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../constants/shader.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  EXPLODE_FUNCTIONS,
  EXPLODE_UNIFORMS,
  EXPLODE_VARYINGS,
} from "./explode.consts";
import { explodeTransform } from "./explodeTransform";

export const explode = (
  effectProps: {},
  effectUniforms: UniformValueConfig[]
): VertexEffectData => {
  const transformation = explodeTransform(effectUniforms);
  const requiredFunctions = EXPLODE_FUNCTIONS;
  const varyingConfig = EXPLODE_VARYINGS;
  const attributeConfig = [
    { id: "randomAngle", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
    { id: "signDirection", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
  ] as AttributeConfig[];

  return {
    attributeConfig,
    requiredFunctions,
    uniformConfig: EXPLODE_UNIFORMS,
    transformation,
    varyingConfig,
  };
};
