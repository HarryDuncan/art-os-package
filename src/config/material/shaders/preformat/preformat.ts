import {
  ParameterConfig,
  InterNodeMap,
  OperatorConfig,
  EffectConfig,
  ShaderTransformationSchema,
  StructConfig,
} from "../schema/types";
import { ShaderParameterMap } from "../generator/types";
import { FRAGMENT_COLOR, TIME, VERTEX_POINT } from "../schema/parameters";
import {
  SHADER_PARAMETER_TYPE_KEY_MAP,
  SHADER_PROPERTY_TYPES,
  SHADER_TYPES,
  VARYING_TYPES,
} from "../schema";
import { getFunctionBasedParameters, getShaderConfigsByType } from "../utils";
import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";
import { getStructsConfigsFromEffects } from "./structs/getStructsConfigsFromEffects";
import { ExternalSchema } from "../../types";
import { formatEffectsAndSchemas } from "./effect-transforms/effectsAndSchemas";
import { formatOperatorConfigs } from "./formatOperatorConfigs";
import { isDefaultParameter } from "../generator/generation/helpers/parameterUtils";

export const preformat = (
  effectParameters: ParameterConfig[],
  shaderEffectConfigs: EffectConfig[],
  operatorConfigs: OperatorConfig[],
  functionConfigs: EffectConfig[],
  schemas: ExternalSchema
): {
  parameterMap: ShaderParameterMap;
  operatorConfigs: OperatorConfig[];
  functionConfigs: EffectConfig[];
  structsConfigs: StructConfig[];
} => {
  const defaultParamsMap = [TIME, VERTEX_POINT, FRAGMENT_COLOR].reduce(
    (acc, effect) => {
      acc.set(effect.key!, {
        ...effect,
      } as ParameterConfig);
      return acc;
    },
    new Map()
  );

  const { convertedAttributes, updatedFragShaderInputMapping } =
    convertAttributesToVaryings(effectParameters, shaderEffectConfigs);

  const { functionBasedVaryings } = getFunctionBasedVaryings(
    effectParameters,
    schemas.function
  );

  // TODO - structs to varyings

  const effectParamsMap = [
    ...convertedAttributes,
    ...effectParameters,
    ...functionBasedVaryings,
  ].reduce((acc, effectParameter) => {
    const { key, guid, parameterType } = effectParameter;
    if (isDefaultParameter(key)) {
      acc.set(key, {
        ...effectParameter,
      } as ParameterConfig);
      return acc;
    }
    const uniqueKey = `${SHADER_PARAMETER_TYPE_KEY_MAP[parameterType]}_${key}_${guid}`;
    acc.set(uniqueKey, {
      ...effectParameter,
    } as ParameterConfig);
    return acc;
  }, new Map() as ShaderParameterMap);

  const parameterMap = new Map([...defaultParamsMap, ...effectParamsMap]);

  // update fragment effects input mapping with new varyings
  const updatedEffectConfigs = shaderEffectConfigs.map((config) => {
    const mappingUpdates = updatedFragShaderInputMapping[config.guid];
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
        {} as Record<string, InterNodeMap>
      );
      return {
        ...config,
        inputMapping: updatedInputMapping,
      };
    }
    return config;
  });

  const { effectsWithSchemas, functionConfigsWithSchemas } =
    formatEffectsAndSchemas(updatedEffectConfigs, functionConfigs, schemas);

  const structsConfigs = getStructsConfigsFromEffects(effectsWithSchemas);

  const formattedOperatorConfigs = formatOperatorConfigs(
    effectsWithSchemas,
    operatorConfigs,
    parameterMap
  );

  return {
    parameterMap,
    operatorConfigs: formattedOperatorConfigs,
    functionConfigs: functionConfigsWithSchemas,
    structsConfigs,
  };
};

const attributeToVarying = (attributeConfigs: ParameterConfig[]) =>
  attributeConfigs.map((attributeConfig) => {
    return {
      ...attributeConfig,
      guid: `${attributeConfig?.guid}`,
      key: `${attributeConfig?.key ?? ""}_varying`,
      parameterType: SHADER_PROPERTY_TYPES.VARYING,
      varyingConfig: {
        varyingType: VARYING_TYPES.ATTRIBUTE,
        attributeKey: attributeConfig?.key ?? "",
        isAttributeReference: true,
      },
    };
  });

const constantToVarying = (constantConfigs: ParameterConfig[]) => {
  return constantConfigs.map((constantConfig) => {
    return {
      ...constantConfig,
      guid: `${constantConfig?.guid}`,
      key: `${constantConfig?.key ?? ""}`,
      parameterType: SHADER_PROPERTY_TYPES.VARYING,
      value: constantConfig.key,
      isFunctionBased: true,
      varyingConfig: {
        varyingType: VARYING_TYPES.CUSTOM,
      },
    };
  });
};

const convertAttributesToVaryings = (
  parameterConfigs: ParameterConfig[],
  shaderEffectConfigs: EffectConfig[]
) => {
  const fragmentShaders = getShaderConfigsByType(
    shaderEffectConfigs,
    SHADER_TYPES.FRAGMENT
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
      updatedFragShaderInputMapping[shaderEffectConfig.guid] =
        attributeConfigs.reduce((acc, attributeConfig) => {
          acc[attributeConfig.key] = `${attributeConfig.key}_varying`;
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
    "key"
  );
  const convertedAttributes = attributeToVarying(uniqueAttributeConfigs);
  return { convertedAttributes, updatedFragShaderInputMapping };
};

const getFunctionBasedVaryings = (
  effectParameters: ParameterConfig[],
  functionSchemas: Record<string, ShaderTransformationSchema[]>
) => {
  const functionBasedParameters = getFunctionBasedParameters(effectParameters);
  if (functionBasedParameters.length === 0)
    return { functionBasedVaryings: [] };

  const requireConversion = functionBasedParameters.filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
  );
  const functionBasedVaryings = constantToVarying(requireConversion);

  const withSchemas = functionBasedVaryings.map((parameter) => {
    const schemaId = parameter.functionConfig?.schemaId;
    if (!schemaId) return parameter;
    const transformSchema = functionSchemas[schemaId];
    if (!transformSchema) {
      console.warn(`Transform schema not found for function ${schemaId}`);
    }
    if (!transformSchema) return parameter;
    return {
      ...parameter,
      functionConfig: {
        ...parameter.functionConfig,
        transformSchema,
      },
    };
  });

  return { functionBasedVaryings: withSchemas };
};
