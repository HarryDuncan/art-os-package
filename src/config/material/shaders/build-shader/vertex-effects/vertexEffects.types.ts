import {
  ShaderFunction,
  StructConfig,
  VertexEffectConfig,
  ParameterConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfigs: ParameterConfig[];
  varyingConfigs: ParameterConfig[];
  transformation: string;
  attributeConfigs: ParameterConfig[];
  structConfigs?: StructConfig[];
}

export type VertexEffectProps = {
  id: string;
  effectType: string;
  effectParameters: ParameterConfig[];
  subEffects: VertexEffectConfig[];
};
