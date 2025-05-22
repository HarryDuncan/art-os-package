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
  effectType: string;
  effectUniforms: ParameterConfig[];
  effectParameters: ParameterConfig[];
  subEffects: FragmentEffectConfig[];
  unfilteredUniforms: ParameterConfig[];
};
