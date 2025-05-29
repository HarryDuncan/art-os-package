import {
  FormattedFunctionConfig,
  ParameterConfig,
  ParameterFunctionConfig,
  ShaderEffectParameter,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../constants/buildShader.consts";
import {
  DEFAULT_PARAMETER_KEY_MAP,
  ROOT_ASSIGNED_VARIABLES,
  ROOT_FUNCTION_TYPES,
} from "./consts";
import {
  getShaderFunctionType,
  getShaderVariableKeys,
  shaderSafeGuid,
} from "./functions";

const getFunctionParameterMapping = (
  matchingFunctionConfig: FormattedFunctionConfig,
  functionConfig: ParameterFunctionConfig | undefined
) => {
  const { functionParameters } = matchingFunctionConfig;
  if (
    !functionConfig ||
    !functionConfig.functionInstantiationParameterMapping
  ) {
    return functionParameters;
  }
  const { functionInstantiationParameterMapping } = functionConfig;
  const updatedFunctionParameters = new Map(functionParameters);
  Array.from(functionParameters.keys()).forEach((id) => {
    const matchingParameter = functionInstantiationParameterMapping[id];
    const newId = getShaderVariableKeys(matchingParameter ?? id);
    const functionParameterContent = functionParameters.get(id);
    if (functionParameterContent) {
      updatedFunctionParameters.delete(id);
      updatedFunctionParameters.set(newId, {
        ...functionParameterContent,
        id: newId,
      });
    }
  });
  return updatedFunctionParameters;
};

const parseSubEffectIntoFunctionContent = (
  effectCode: string[],
  subEffectData: {
    requiredFunctions: ShaderFunction[];
    transformation: string;
  }[]
) => {
  if (subEffectData.length === 0) {
    return effectCode;
  }

  return effectCode.flatMap((line) => {
    if (line.includes("{{SUB_EFFECTS}}")) {
      return (
        subEffectData
          // write subeffect transformations and function instantiations using the function parameter keys
          .flatMap((subEffect) => {
            const { requiredFunctions, transformation } = subEffect;
            console.log("subEffect", subEffect);
            console.log("transformation", requiredFunctions);
            const selectedFunction = requiredFunctions[0];

            const subEffectAssignedVariableId =
              selectedFunction.assignedVariableId ===
              SHADER_VARIABLE_TYPES.VERTEX_POINT
                ? "pointPosition"
                : "fragColor";

            const functionParameters = Array.from(
              selectedFunction.functionParameters?.values() ?? []
            )
              .map((value) => {
                return `{{${value.id}}}`;
              })
              .join(",");
            const functionInstantiation = `{{${subEffectAssignedVariableId}}} = ${selectedFunction.functionName}(${functionParameters});`;
            return [transformation, functionInstantiation];
          })
          .join("\n")
      );
    }
    return line;
  });
};
export const prepareFunctionConfigs = (
  configs: ShaderTransformationConfig[],
  shaderEffectParameters: ShaderEffectParameter,
  effectId: string,
  parametersWithFunctionConfigs: ParameterConfig[],
  isSubEffect: boolean,
  subEffectData: {
    requiredFunctions: ShaderFunction[];
    transformation: string;
  }[]
): FormattedFunctionConfig[] => {
  const functionIds = configs.map(({ id }) => id);

  const formattedConfigs = configs.map((config) => {
    const { id, effectCode, assignedVariableId } = config;

    const shaderFunctionType = getShaderFunctionType(
      assignedVariableId,
      isSubEffect
    );
    // console.log(id);
    // console.log(shaderFunctionType);
    // console.log("subEffectData", subEffectData);
    // console.log(parameterIds);
    const updatedEffectCode = ROOT_FUNCTION_TYPES.includes(shaderFunctionType)
      ? parseSubEffectIntoFunctionContent(effectCode, subEffectData)
      : effectCode;

    const functionDependencies = updatedEffectCode.flatMap((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => functionIds.includes(variable))
      ) {
        return variables.filter((variable) => functionIds.includes(variable));
      }
      return [];
    });

    // Get parameters from dependent functions
    const effectFunctionParameterMap = new Map();
    functionDependencies.forEach((depId) => {
      const dependentFunction = configs.find((f) => f.id === depId);
      if (!dependentFunction) return [];

      dependentFunction.effectCode.forEach((line) => {
        const variables = line
          .match(/{{(\w+)}}/g)
          ?.map((match) => match.replace(/[{}]/g, ""));
        if (
          variables &&
          variables.some((variable) => shaderEffectParameters.has(variable))
        ) {
          variables.forEach((variable) => {
            if (shaderEffectParameters.has(variable)) {
              effectFunctionParameterMap.set(
                variable,
                shaderEffectParameters.get(variable)
              );
            }
          });
        }
      });
    });

    updatedEffectCode.forEach((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => shaderEffectParameters.has(variable))
      ) {
        variables.forEach((variable) => {
          if (shaderEffectParameters.has(variable)) {
            effectFunctionParameterMap.set(
              variable,
              shaderEffectParameters.get(variable)
            );
          }
        });
      }
    });

    Array.from(effectFunctionParameterMap.entries()).forEach(([key, value]) => {
      if (
        ROOT_FUNCTION_TYPES.includes(shaderFunctionType) ||
        ROOT_ASSIGNED_VARIABLES.includes(assignedVariableId ?? "")
      ) {
        const parameterKey = DEFAULT_PARAMETER_KEY_MAP[key];

        if (parameterKey) {
          effectFunctionParameterMap.set(key, {
            ...value,
            mappedParameterKey: parameterKey,
          });
        }
      }
    });

    return {
      ...config,
      effectCode: updatedEffectCode,
      functionType: shaderFunctionType,
      functionName: `${id}_${shaderSafeGuid(effectId)}`,
      functionDependencyIds: [...new Set(functionDependencies)],
      functionParameters: effectFunctionParameterMap,
    };
  });

  // - if matching function in current config - check for a function add the instantiation parameter config
  const matchingFunctionConfigs = parametersWithFunctionConfigs.flatMap(
    (parameterConfig) => {
      const { functionConfig, id } = parameterConfig;
      const matchingFunctionConfig = formattedConfigs.find((config) => {
        return config.id === functionConfig?.functionId;
      });
      if (matchingFunctionConfig) {
        const instantiationParameters = getFunctionParameterMapping(
          matchingFunctionConfig as unknown as FormattedFunctionConfig,
          functionConfig
        );

        const assignedVariableId = id;
        return {
          ...matchingFunctionConfig,
          functionParameters: instantiationParameters,
          assignedVariableId,
          dontDeclare: true,
        };
      }
      return [];
    }
  );

  return [
    ...formattedConfigs,
    ...(matchingFunctionConfigs as unknown as FormattedFunctionConfig[]),
  ] as unknown as FormattedFunctionConfig[];
};
