import { VaryingConfig } from "../buildShader.types";

export const formatVaryingsForEffect = (
  varyingConfig: VaryingConfig[],
  effectId: string
) => {
  return varyingConfig?.filter((v) => v.effectIds?.includes(effectId)) ?? [];
};
