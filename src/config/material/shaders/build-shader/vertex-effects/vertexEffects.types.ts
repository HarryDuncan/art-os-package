import {
  ShaderFunction,
  VertexEffectConfig,
  ParameterConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  transformation: string;
}

export type VertexEffectProps = {
  id: string;
  effectType: string;
  effectParameters: ParameterConfig[];
  subEffects: VertexEffectConfig[];
};
