import {
  AttributeConfig,
  FragmentEffectConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
} from "../buildShader.types";

export type FragmentEffectData = {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig[];
  attributeConfig: AttributeConfig[];
  varyingConfig: VaryingConfig[];
  transformation: string;
  structConfigs?: StructConfig[];
};

export type FragmentEffectProps = {
  effectUniforms: UniformConfig[];
  effectParameters: Record<string, unknown>;
  effectType: string;
  subEffects: FragmentEffectConfig[];
  unfilteredUniforms: UniformConfig[];
};
