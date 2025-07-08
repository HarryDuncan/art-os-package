import { MeshTransformConfig } from "../../../../types";
import {
  BuiltShaderConfig,
  EffectFunctionConfig,
  ParameterConfig,
  ShaderEffectConfig,
} from "../../../../types/materials/index";
import { SHADER_TYPES } from "../build-shader/constants";
import {
  DEFAULT_UNIFORMS,
  SHADER_PROPERTY_TYPES,
} from "../build-shader/constants/shader.consts";
import { VARYING_TYPES } from "../build-shader/shader-properties/varyings/varyings.consts";
import { formatShaderVaryingParameters } from "./formatShaderVaryingParameters";

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
      parameterType: SHADER_PROPERTY_TYPES.VARYING,
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
    const isFragmentEffect = fragmentEffectIds.some((effectId) =>
      transform.effectIds?.includes(effectId)
    );
    if (!isFragmentEffect || !transform.transformParameterConfigs) return [];
    return transform.transformParameterConfigs;
  });
  return fragmentAttributeConfigs.map((attributeConfig) => {
    return {
      ...attributeConfig,
      id: `${attributeConfig?.id ?? ""}_varying`,
      parameterType: SHADER_PROPERTY_TYPES.VARYING,
      varyingConfig: {
        varyingType: VARYING_TYPES.ATTRIBUTE,
        attributeKey: attributeConfig?.id ?? "",
      },
    };
  });
};

const getLinkedEffectParameters = (
  effect: ShaderEffectConfig,
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const { id } = effect;
  return shaderEffectConfigs.flatMap((effect) => {
    if (effect.id === id) return [];

    return effect.effectParameters.filter((parameter) => {
      if (parameter.isFunctionBased) {
        return parameter.functionConfig?.effectId === id;
      }
      return parameter.effectIds?.includes(id);
    });
  });
};

export const formatBuiltShaderConfig = (
  shaderEffectConfigs: ShaderEffectConfig[],
  meshTransforms: MeshTransformConfig[],
  effectFunctionConfigs: EffectFunctionConfig[]
): BuiltShaderConfig => {
  // const meshTransformAttributes = meshTransforms.flatMap(
  //   (transform) => transform.attributeConfigs ?? []
  // );
  const materialAttributeConfigs = shaderEffectConfigs?.flatMap((effect) =>
    effect.effectParameters.filter(
      (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
    )
  );

  const transformVaryingConfigs = getVaryingFromFragmentEffectMeshTransforms(
    meshTransforms,
    shaderEffectConfigs ?? []
  ) as ParameterConfig[];
  return {
    shaderEffectConfigs:
      shaderEffectConfigs?.map((effect) => {
        const formattedEffect = formatEffectParameters(
          effect,
          shaderEffectConfigs
        );

        return formattedEffect;
      }) ?? [],
    uniformConfigs: [
      ...DEFAULT_UNIFORMS,
      ...(shaderEffectConfigs?.flatMap((effect) =>
        effect.effectParameters.filter(
          (parameter) =>
            parameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM &&
            !parameter.isTransformInput
        )
      ) ?? []),
    ],
    attributeConfigs: [...(materialAttributeConfigs ?? [])],
    varyingConfigs: formatShaderVaryingParameters([
      ...(transformVaryingConfigs ?? []),
      ...(shaderEffectConfigs?.flatMap(
        (effect) =>
          effect.effectParameters?.filter(
            (parameter) =>
              parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
          ) ?? []
      ) ?? []),
    ] as ParameterConfig[]),
    effectFunctionConfigs,
  };
};

const formatEffectParameters = (
  effect: ShaderEffectConfig,
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const otherEffectParameters = getLinkedEffectParameters(
    effect,
    shaderEffectConfigs ?? []
  );

  const allEffectParameters = [
    ...effect.effectParameters,
    ...otherEffectParameters,
  ].flatMap((parameter) => {
    if (parameter.isTransformInput) {
      return [];
    }
    if (
      effect.shaderType === SHADER_TYPES.FRAGMENT &&
      parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
    ) {
      return attributeToVarying([parameter], false) as ParameterConfig[];
    }
    return [parameter];
  });

  // todo - remove duplicate parameters
  return {
    ...effect,
    effectParameters: allEffectParameters,
  };
};
