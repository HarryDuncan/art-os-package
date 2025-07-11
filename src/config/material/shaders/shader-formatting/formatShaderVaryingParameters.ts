import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";
import {
  ParameterConfig,
  ShaderEffectConfig,
} from "../build-shader/buildShader.types";
import { SHADER_TYPES } from "../build-shader/constants/buildShader.consts";
import { SHADER_PROPERTY_TYPES } from "../build-shader/constants/shader.consts";
import { VARYING_TYPES } from "../build-shader/shader-properties/varyings/varyings.consts";

export const attributeToVarying = (
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

export const formatShaderVaryingParameters = (
  parameterConfigs: ParameterConfig[],
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const fragmentShaders = shaderEffectConfigs.filter(
    (shaderEffectConfig) =>
      shaderEffectConfig.effectType === SHADER_TYPES.FRAGMENT
  );
  let attributeConfigs = fragmentShaders.flatMap((shaderEffectConfig) => {
    const parameterIds = Object.values(
      shaderEffectConfig.inputMapping ?? {}
    ).flatMap((input) => (input.nodeType === "parameter" ? input.itemId : []));
    const attributeConfigs =
      parameterIds.flatMap((parameterId) => {
        const parameterConfig = parameterConfigs.find(
          (parameterConfig) => parameterConfig.guid === parameterId
        );
        return parameterConfig ?? [];
      }) ?? [];
    return attributeConfigs;
  });
  // Make attributeConfigs unique on id
  const uniqueAttributeConfigs = removeDuplicatesByKey(attributeConfigs, "id");
  const convertedAttributes = attributeToVarying(uniqueAttributeConfigs);
  const varyingConfigs = [
    ...parameterConfigs.filter(
      (parameterConfig) =>
        parameterConfig.parameterType === SHADER_PROPERTY_TYPES.VARYING
    ),
    ...convertedAttributes,
  ];
  const uniqueVaryingConfigs = removeDuplicatesByKey(varyingConfigs, "id");
  return uniqueVaryingConfigs as ParameterConfig[];
};
