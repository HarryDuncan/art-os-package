import { UniformConfig } from "../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { vertexFilterTransformation } from "./vertexFilterTransformation";

export const vertexFilterFunctions = () => [];

export const vertexFilterUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uReduced", valueType: "FLOAT", value: 5.0 }],
});

export const vertexFilterVaryings = () => [];

export const vertexFilter = (previousPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.FILTERED_POINT;
  const uniformConfig = vertexFilterUniforms() as UniformConfig;
  const varyingConfig = vertexFilterVaryings();
  const transformation = vertexFilterTransformation(
    previousPointName,
    pointName
  );
  const requiredFunctions = vertexFilterFunctions();
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
