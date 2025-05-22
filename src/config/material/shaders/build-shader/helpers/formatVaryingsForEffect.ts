import { VaryingConfig } from "../buildShader.types";

export const formatVaryingsForEffect = (
  varyingConfigs: VaryingConfig[],
  effectId: string
) => {
  return varyingConfigs?.filter((v) => v.effectIds?.includes(effectId)) ?? [];
};
