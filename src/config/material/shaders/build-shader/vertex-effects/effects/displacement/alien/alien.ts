import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
import { UniformConfig, VaryingConfig } from "../../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { alienTransform } from "./alienTransform";

export const distortFunctions = () => [
  { id: "twister", functionDefinition: twisterDistortion },
];

export const distortUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uRadius", valueType: "FLOAT", value: 1.5 }],
});

export const distortVaryings = () =>
  [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
  ] as VaryingConfig[];

export const alienDistort = (previousPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.DISTORT_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = distortVaryings();
  const transformation = alienTransform(previousPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
