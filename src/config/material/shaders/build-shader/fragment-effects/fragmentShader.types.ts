import {
  ParameterConfig,
  FragmentEffectConfig,
  ShaderFunction,
  StructConfig,
} from "../buildShader.types";

export type FragmentEffectData = {
  requiredFunctions: ShaderFunction[];
  uniformConfigs: ParameterConfig[];
  attributeConfigs: ParameterConfig[];
  varyingConfigs: ParameterConfig[];
  transformation: string;
  structConfigs?: StructConfig[];
};

export type FragmentEffectProps = {
  id: string;
  effectType: string;
  effectParameters: ParameterConfig[];
  subEffects: FragmentEffectConfig[];
};
