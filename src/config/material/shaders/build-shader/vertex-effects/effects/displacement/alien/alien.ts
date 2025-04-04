import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
import { UniformConfig, VaryingConfig } from "../../../../types";
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

export const alienDistort = (): VertexEffectData => {
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = distortVaryings();
  const transformation = alienTransform();
  const requiredFunctions = distortFunctions();
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
  };
};
