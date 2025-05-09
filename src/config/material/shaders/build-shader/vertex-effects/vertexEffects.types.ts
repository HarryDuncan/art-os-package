import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  AttributeConfig,
  StructConfig,
} from "../../../../../types/materials/index";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  transformation: string;
  attributeConfig: AttributeConfig[];
  structConfigs?: StructConfig[];
}

export type MorphObject = {
  pointName: string;
  normalName: string;
};
