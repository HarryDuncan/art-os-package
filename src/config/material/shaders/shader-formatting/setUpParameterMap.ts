import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";
import {
  ParameterConfig,
  ShaderParameterMap,
  ShaderEffectConfig,
  ShaderParameter,
  OutputInputMapping,
} from "../build-shader/buildShader.types";
import { SHADER_TYPES } from "../build-shader/constants";
import { SHADER_PROPERTY_TYPES } from "../build-shader/constants/shader.consts";
import {
  DEFAULT_FRAGMENT_PARAMETERS,
  DEFAULT_VERTEX_PARAMETERS,
} from "../build-shader/helpers/generate-transform/consts";
import { VARYING_TYPES } from "../build-shader/shader-properties/varyings/varyings.consts";

export const formatParametersAndEffects = (
  effectParameters: ParameterConfig[],
  shaderEffectConfigs: ShaderEffectConfig[]
): {
  parameterMap: ShaderParameterMap;
  updatedEffectConfigs: ShaderEffectConfig[];
} => {
  const defaultParamsMap = [
    ...DEFAULT_VERTEX_PARAMETERS,
    ...DEFAULT_FRAGMENT_PARAMETERS,
  ].reduce((acc, effect) => {
    acc.set(effect.id!, {
      ...effect,
    } as ShaderParameter);
    return acc;
  }, new Map() as ShaderParameterMap);

  const { convertedAttributes, updatedFragShaderInputMapping } =
    convertAttributesToVaryings(effectParameters, shaderEffectConfigs);

  const effectParamsMap = [...convertedAttributes, ...effectParameters].reduce(
    (acc, effectParameter) => {
      const { id: parameterId, guid } = effectParameter;
      if (effectParameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE) {
        acc.set(parameterId, {
          ...effectParameter,
          shaderParameterId: `${parameterId}`,
        } as ShaderParameter);
      } else if (
        effectParameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
      ) {
        acc.set(`${parameterId}_varying`, {
          ...effectParameter,
          shaderParameterId: `${parameterId}`,
        } as ShaderParameter);
      } else {
        acc.set(`${parameterId}_${guid}`, {
          ...effectParameter,
          shaderParameterId: `${parameterId}_${guid}`,
        } as ShaderParameter);
      }

      return acc;
    },
    new Map() as ShaderParameterMap
  );

  const parameterMap = new Map([...defaultParamsMap, ...effectParamsMap]);
  console.log(parameterMap);
  const updatedEffectConfigs = shaderEffectConfigs.map((config) => {
    const mappingUpdates = updatedFragShaderInputMapping[config.id];
    if (mappingUpdates) {
      const { inputMapping } = config;
      const updatedInputMapping = Object.entries(inputMapping ?? {}).reduce(
        (acc, [key, value]) => {
          if (mappingUpdates[key]) {
            const newKey = mappingUpdates[key];
            acc[newKey] = value;
            return acc;
          }
          acc[key] = value;
          return acc;
        },
        {} as Record<string, OutputInputMapping>
      );
      return {
        ...config,
        inputMapping: updatedInputMapping,
      };
    }
    // const mappingToRemove = fragmentIdsToRemove[config.id];
    // if (mappingToRemove) {
    //   const { inputMapping } = config;
    //   const updatedInputMapping = Object.entries(inputMapping ?? {}).reduce(
    //     (acc, [key, value]) => {
    //       if (key !== mappingToRemove) {
    //         acc[key] = value;
    //       }
    //       return acc;
    //     },
    //     {} as Record<string, OutputInputMapping>
    //   );
    //   return {
    //     ...config,
    //     inputMapping: updatedInputMapping,
    //   };
    // }
    return config;
  });
  return { parameterMap, updatedEffectConfigs };
};

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

const convertAttributesToVaryings = (
  parameterConfigs: ParameterConfig[],
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const fragmentShaders = shaderEffectConfigs.filter(
    (shaderEffectConfig) =>
      shaderEffectConfig.shaderType === SHADER_TYPES.FRAGMENT
  );

  const updatedFragShaderInputMapping: Record<
    string,
    Record<string, string>
  > = {};

  let attributeConfigs = fragmentShaders.flatMap((shaderEffectConfig) => {
    const parameterIds = Object.values(
      shaderEffectConfig.inputMapping ?? {}
    ).flatMap((input) => (input.nodeType === "parameter" ? input.itemId : []));

    const attributeConfigs =
      parameterIds.flatMap((parameterId) => {
        const parameterConfig = parameterConfigs.find(
          (parameterConfig) => parameterConfig.guid === parameterId
        );
        return parameterConfig?.parameterType ===
          SHADER_PROPERTY_TYPES.ATTRIBUTE
          ? parameterConfig
          : [];
      }) ?? [];
    if (attributeConfigs.length > 0) {
      updatedFragShaderInputMapping[shaderEffectConfig.id] =
        attributeConfigs.reduce((acc, attributeConfig) => {
          acc[attributeConfig.id] = `${attributeConfig.id}_varying`;
          return acc;
        }, {} as Record<string, string>);
    }
    return attributeConfigs;
  });

  const functionWrapperAttributes = parameterConfigs.filter(
    (parameterConfig) =>
      parameterConfig.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE &&
      !parameterConfig.fromConfig
  );

  // Make attributeConfigs unique on id
  const uniqueAttributeConfigs = removeDuplicatesByKey(
    [...attributeConfigs, ...functionWrapperAttributes],
    "id"
  );
  const convertedAttributes = attributeToVarying(uniqueAttributeConfigs);
  return { convertedAttributes, updatedFragShaderInputMapping };
};
