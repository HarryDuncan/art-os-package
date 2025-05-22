import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  AttributeConfig,
  StructConfig,
  VertexEffectConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfigs: UniformConfig[];
  varyingConfigs: VaryingConfig[];
  transformation: string;
  attributeConfigs: AttributeConfig[];
  structConfigs?: StructConfig[];
}

export type VertexEffectProps = {
  effectUniforms: UniformConfig[];
  effectVaryings: VaryingConfig[];
  effectParameters: any;
  effectType: string;
  subEffects: VertexEffectConfig[];
  unfilteredUniforms: UniformConfig[];
  unfilteredVaryings: VaryingConfig[];
};
