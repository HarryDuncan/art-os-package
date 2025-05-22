import { MeshTransformConfig } from "../../../../types";
import { BuiltShaderConfig } from "../../../../types/materials/index";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>,
  meshTransforms: MeshTransformConfig[]
): BuiltShaderConfig => {
  const {
    shaderEffectConfigs,
    uniformConfigs,
    varyingConfigs,
    attributeConfigs,
  } = parsedConfig;
  const meshTransformAttributes = meshTransforms.flatMap(
    (transform) => transform.attributeConfigs ?? []
  );
  return {
    shaderEffectConfigs: shaderEffectConfigs ?? [],
    uniformConfigs: uniformConfigs ?? [],
    attributeConfigs: [...(attributeConfigs ?? []), ...meshTransformAttributes],
    varyingConfigs: varyingConfigs ?? [],
  };
};
