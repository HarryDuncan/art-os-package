import {
  AttributeConfig,
  FragmentEffectConfig,
  ParameterConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
} from "../buildShader.types";

export type FragmentEffectData = {
  requiredFunctions: ShaderFunction[];
  uniformConfigs: UniformConfig[];
  attributeConfigs: AttributeConfig[];
  varyingConfigs: VaryingConfig[];
  transformation: string;
  structConfigs?: StructConfig[];
};

export type FragmentEffectProps = {
  effectType: string;
  effectUniforms: UniformConfig[];
  effectParameters: ParameterConfig[];
  subEffects: FragmentEffectConfig[];
  unfilteredUniforms: UniformConfig[];
};
