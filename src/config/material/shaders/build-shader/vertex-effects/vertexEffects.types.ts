import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  AttributeConfig,
  StructConfig,
  UniformValueConfig,
  VertexEffectConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  transformation: string;
  attributeConfig: AttributeConfig[];
  structConfigs?: StructConfig[];
}

export type VertexEffectProps = {
  effectUniforms: UniformValueConfig[];
  effectVaryings: VaryingConfig[];
  effectParameters: any;
  effectType: string;
  subEffects: VertexEffectConfig[];
  unfilteredUniforms: UniformConfig;
  unfilteredVaryings: VaryingConfig[];
};
