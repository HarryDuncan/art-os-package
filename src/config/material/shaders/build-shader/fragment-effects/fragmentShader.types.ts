import {
  ParameterConfig,
  FragmentEffectConfig,
  ShaderFunction,
  StructConfig,
  VaryingConfig,
} from "../buildShader.types";

export type FragmentEffectData = {
  requiredFunctions: ShaderFunction[];
  uniformConfigs: ParameterConfig[];
  attributeConfigs: ParameterConfig[];
  varyingConfigs: VaryingConfig[];
  transformation: string;
  structConfigs?: StructConfig[];
};

export type FragmentEffectProps = {
  id: string;
  effectType: string;
  effectParameters: ParameterConfig[];
  subEffects: FragmentEffectConfig[];
};
