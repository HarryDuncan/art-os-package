import { VaryingConfig } from "../buildShader.types";

export const formatVaryingsForEffect = (
  varyingConfig: VaryingConfig[],
  effectId: string
) => {
  console.log("varyingConfig", varyingConfig);
  return varyingConfig?.filter((v) => v.effectIds?.includes(effectId)) ?? [];
};
