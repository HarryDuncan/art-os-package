import { MeshTransformConfig } from "../../../../types";
import {
  BuiltShaderConfig,
  ParameterConfig,
  ShaderEffectConfig,
} from "../../../../types/materials/index";
import { SHADER_TYPES } from "../build-shader/constants";
import { DEFAULT_UNIFORMS } from "../build-shader/constants/shader.consts";
import { VARYING_TYPES } from "../build-shader/shader-properties/varyings/varyings.consts";

const attributeToVarying = (
  attributeConfigs: ParameterConfig[],
  replaceId: boolean = true
) =>
  attributeConfigs.map((attributeConfig) => {
    return {
      ...attributeConfig,
      id: replaceId
        ? `${attributeConfig?.id ?? ""}_varying`
        : attributeConfig?.id ?? "",
      isVarying: true,
      varyingConfig: {
        varyingType: VARYING_TYPES.ATTRIBUTE,
        attributeKey: attributeConfig?.id ?? "",
        isAttributeReference: true,
      },
    };
  });

const getVaryingFromFragmentEffectMeshTransforms = (
  meshTransforms: MeshTransformConfig[],
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const fragmentEffectIds = shaderEffectConfigs.flatMap((effect) =>
    effect.shaderType === SHADER_TYPES.FRAGMENT ? effect.id : []
  );
  if (fragmentEffectIds.length === 0) return [];

  const fragmentAttributeConfigs = meshTransforms.flatMap((transform) => {
    const isFragmentEffect = fragmentEffectIds.includes(
      transform.effectId ?? ""
    );
    if (!isFragmentEffect) return [];
    return transform.attributeConfigs;
  });
  return fragmentAttributeConfigs.map((attributeConfig) => {
    return {
      ...attributeConfig,
      id: `${attributeConfig?.id ?? ""}_varying`,
      isVarying: true,
      isAttribute: false,
      varyingConfig: {
        varyingType: VARYING_TYPES.ATTRIBUTE,
        attributeKey: attributeConfig?.id ?? "",
      },
    };
  });
};

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>,
  meshTransforms: MeshTransformConfig[]
): BuiltShaderConfig => {
  const { shaderEffectConfigs } = parsedConfig;
  const meshTransformAttributes = meshTransforms.flatMap(
    (transform) => transform.attributeConfigs ?? []
  );
  const materialAttributeConfigs = shaderEffectConfigs?.flatMap((effect) =>
    effect.effectParameters.filter((parameter) => parameter.isAttribute)
  );

  const transformVaryingConfigs = getVaryingFromFragmentEffectMeshTransforms(
    meshTransforms,
    shaderEffectConfigs ?? []
  ) as ParameterConfig[];
  return {
    shaderEffectConfigs:
      shaderEffectConfigs?.map((effect) => {
        const meshTransformParametersForEffect =
          meshTransforms
            .filter((transform) => transform.effectId === effect.id)
            .flatMap((transform) => {
              if (effect.shaderType === SHADER_TYPES.FRAGMENT) {
                return attributeToVarying(
                  transform.attributeConfigs ?? [],
                  false
                ) as ParameterConfig[];
              }
              return transform.attributeConfigs ?? [];
            }) ?? [];
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
    varyingConfigs: [
      ...(transformVaryingConfigs ?? []),
      ...(shaderEffectConfigs?.flatMap((effect) =>
        effect.effectParameters.filter((parameter) => parameter.isVarying)
      ) ?? []),
    ],
  };
};
