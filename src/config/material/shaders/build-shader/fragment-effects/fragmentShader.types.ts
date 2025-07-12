import { FragmentEffectConfig, ShaderFunction } from "../buildShader.types";

export type FragmentEffectData = {
  requiredFunctions: ShaderFunction[];
  transformation: string;
};

export type FragmentEffectProps = {
  id: string;
  effectType: string;
  subEffects?: FragmentEffectConfig[];
};
