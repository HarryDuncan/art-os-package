import { UniformValueConfig } from "../../../../../../../../types/materials/index";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  EXPLODE_FUNCTIONS,
  EXPLODE_UNIFORMS,
  EXPLODE_VARYINGS,
} from "./explode.consts";
import { explodeTransform } from "./explodeTransform";

export const explode = (
  effectUniforms: UniformValueConfig[]
): VertexEffectData => {
  const transformation = explodeTransform(effectUniforms);
  const requiredFunctions = EXPLODE_FUNCTIONS;
  const varyingConfig = EXPLODE_VARYINGS;

  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig: EXPLODE_UNIFORMS,
    transformation,
    varyingConfig,
  };
};
