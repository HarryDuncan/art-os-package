import { ShaderEffectConfig } from "../../../../..";

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: number[];
};

export type EffectFunctionConfig = {
  id: string;
  functionId: string;
  effectFunctionEditorValues?: SplitValueEditorConfig | null;
  outputMapping: Record<string, string>;
  inputMapping: Record<string, string> | null;
  effects: ShaderEffectConfig[];
};
