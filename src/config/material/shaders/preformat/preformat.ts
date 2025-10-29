import {
  ParameterConfig,
  OutputInputMapping,
  OperatorConfig,
  ShaderEffectConfig,
  ShaderTransformationSchema,
} from "../schema/types";
import { ShaderParameter, ShaderParameterMap } from "../generator/types";
import { FRAGMENT_COLOR, TIME, VERTEX_POINT } from "../schema/parameters";
import { SHADER_PROPERTY_TYPES, SHADER_TYPES, VARYING_TYPES } from "../schema";
import { formatShaderEffects } from "./effectsAndOperators";
import {
  getEffectConfigUsingParameters,
  getEffectFunctionConfigs,
  getFunctionBasedParameters,
  getShaderConfigsByType,
} from "../utils";
import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";

export const preformat = (
  effectParameters: ParameterConfig[],
  shaderEffectConfigs: ShaderEffectConfig[],
  operatorConfigs: OperatorConfig[],
  schemas: Record<string, Record<string, unknown>>
): {
  parameterMap: ShaderParameterMap;
  updatedEffectConfigs: ShaderEffectConfig[];
  updatedOperatorConfigs: OperatorConfig[];
  vertexEffects: OperatorConfig[];
  fragmentEffects: OperatorConfig[];
} => {
  const defaultParamsMap = [TIME, VERTEX_POINT, FRAGMENT_COLOR].reduce(
    (acc, effect) => {
      acc.set(effect.key!, {
        ...effect,
      } as ShaderParameter);
      return acc;
    },
    new Map() as ShaderParameterMap
  );

  const { convertedAttributes, updatedFragShaderInputMapping } =
    convertAttributesToVaryings(effectParameters, shaderEffectConfigs);

  const { functionBasedVaryings, updatedEffectInputMapping } =
    getFunctionBasedVaryings(
      effectParameters,
      shaderEffectConfigs,
      operatorConfigs,
      schemas.function
    );

  const effectParamsMap = [
    ...convertedAttributes,
    ...effectParameters,
    ...functionBasedVaryings,
  ].reduce((acc, effectParameter) => {
    const { key: parameterId, guid } = effectParameter;
    if (
      effectParameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM &&
      effectParameter.isDefault
    ) {
      acc.set(parameterId, {
        ...effectParameter,
        shaderParameterId: `${parameterId}`,
      } as ShaderParameter);
      return acc;
    }
    if (effectParameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE) {
      acc.set(parameterId, {
        ...effectParameter,
        shaderParameterId: `${parameterId}`,
      } as ShaderParameter);
    } else if (
      effectParameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
    ) {
      acc.set(`${parameterId}`, {
        ...effectParameter,
        shaderParameterId: `${parameterId}`,
      } as ShaderParameter);
    } else if (effectParameter.isFunctionBased) {
      const transformSchema = schemas.function[
        effectParameter.functionConfig?.schemaId
      ].transformSchema as ShaderTransformationSchema[];
      if (!transformSchema) {
        console.warn(
          `Transform schema not found for function ${effectParameter.functionConfig?.schemaId}`
        );
        return acc;
      }
      acc.set(`${parameterId}`, {
        ...effectParameter,
        functionConfig: {
          ...effectParameter.functionConfig,
          transformSchema: transformSchema,
        },
        shaderParameterId: `${parameterId}`,
      } as ShaderParameter);
    } else {
      acc.set(`${parameterId}_${guid}`, {
        ...effectParameter,
        shaderParameterId: `${parameterId}_${guid}`,
      } as ShaderParameter);
    }

    return acc;
  }, new Map() as ShaderParameterMap);

  const parameterMap = new Map([...defaultParamsMap, ...effectParamsMap]);
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
        {} as Record<string, OutputInputMapping>
      );
      return {
        ...config,
        inputMapping: updatedInputMapping,
      };
    }
    return config;
  });

  const updatedOperatorConfigs = operatorConfigs.map((config) => {
    const mappingUpdates = updatedEffectInputMapping[config.guid];
    if (mappingUpdates) {
      return {
        ...config,
        inputMapping: mappingUpdates,
      };
    }
    return config;
  });

  const { vertexEffects, fragmentEffects } = formatShaderEffects(
    updatedEffectConfigs,
    updatedOperatorConfigs,
    schemas
  );

  return {
    parameterMap,
    updatedEffectConfigs,
    updatedOperatorConfigs,
    vertexEffects,
    fragmentEffects,
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
  shaderEffectConfigs: ShaderEffectConfig[]
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
  shaderEffectConfigs: ShaderEffectConfig[],
  operatorConfigs: OperatorConfig[],
  functionSchemas: Record<string, ShaderTransformationSchema[]>
) => {
  const functionBasedParameters = getFunctionBasedParameters(effectParameters);
  if (functionBasedParameters.length === 0)
    return { functionBasedVaryings: [], updatedEffectInputMapping: {} };

  const updatedEffectInputMapping: Record<
    string,
    Record<string, OutputInputMapping>
  > = {};

  const requireConversion = functionBasedParameters.filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
  );
  const functionBasedVaryings = constantToVarying(requireConversion);

  const withSchemas = functionBasedVaryings.map((parameter) => {
    const transformSchema =
      functionSchemas[parameter.functionConfig?.schemaId].transformSchema;
    if (!transformSchema) {
      console.warn(
        `Transform schema not found for function ${parameter.functionConfig?.schemaId}`
      );
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

  return { functionBasedVaryings: withSchemas, updatedEffectInputMapping };
};
