import { MeshTransformConfig } from "../../../../types";
import { BuiltShaderConfig } from "../../../../types/materials/index";
import { DEFAULT_UNIFORMS } from "../build-shader/constants/shader.consts";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>,
  meshTransforms: MeshTransformConfig[]
): BuiltShaderConfig => {
  const { shaderEffectConfigs, varyingConfigs } = parsedConfig;
  const meshTransformAttributes = meshTransforms.flatMap(
    (transform) => transform.attributeConfigs ?? []
  );
  const materialAttributeConfigs = shaderEffectConfigs?.flatMap((effect) =>
    effect.effectParameters.filter((parameter) => parameter.isAttribute)
  );
  return {
    shaderEffectConfigs:
      shaderEffectConfigs?.map((effect) => {
        const meshTransformParametersForEffect = meshTransforms
          .filter((transform) => transform.effectId === effect.id)
          .flatMap((transform) => transform.attributeConfigs ?? []);
        if (meshTransformParametersForEffect.length === 0) return effect;
        return {
          ...effect,
          effectParameters: [
            ...effect.effectParameters,
            ...meshTransformParametersForEffect,
          ],
        };
      }) ?? [],
    uniformConfigs: [
      ...DEFAULT_UNIFORMS,
      ...(shaderEffectConfigs?.flatMap((effect) =>
        effect.effectParameters.filter((parameter) => parameter.isUniform)
      ) ?? []),
    ],
    attributeConfigs: [
      ...(materialAttributeConfigs ?? []),
      ...meshTransformAttributes,
    ],
    varyingConfigs: varyingConfigs ?? [],
  };
};
