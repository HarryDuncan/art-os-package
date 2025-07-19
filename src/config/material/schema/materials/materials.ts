import { DEFAULT_BLENDING } from "../blending-options/consts";
import { MATERIAL_TYPES } from "../consts";

export const DEFAULT_MATERIAL_GENERATED_SHADER = {
  id: "default-material",
  materialType: MATERIAL_TYPES.BUILT_SHADER,
  shaderEffectConfigs: [],
  operatorConfigs: [],
  parameterConfigs: [],
  blendingConfig: DEFAULT_BLENDING,
};
