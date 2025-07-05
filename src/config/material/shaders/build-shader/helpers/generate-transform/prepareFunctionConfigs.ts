import {
  FormattedFunctionConfig,
  ParameterFunctionConfig,
  ShaderParameterMap,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../constants/buildShader.consts";
import {
  DEFAULT_PARAMETER_KEY_MAP,
  ROOT_ASSIGNED_VARIABLES,
  ROOT_FUNCTION_TYPES,
} from "./consts";
import { getShaderFunctionType } from "./functions";

const getFunctionParameterMapping = (
  matchingFunctionConfig: FormattedFunctionConfig,
  functionConfig: ParameterFunctionConfig | undefined
) => {
  const { functionParameters } = matchingFunctionConfig;
  if (!functionConfig) {
    return functionParameters;
  }
  const { functionInstantiationParameterMapping } = functionConfig;
  const updatedFunctionParameters = new Map(functionParameters);
  Array.from(functionParameters.keys()).forEach((id) => {
    const mappedParameterKey =
      functionInstantiationParameterMapping?.[id] ?? null;
    const matchingParameter =
      DEFAULT_PARAMETER_KEY_MAP[mappedParameterKey || id];

    if (matchingParameter) {
      const functionParameterContent = functionParameters.get(id);
      if (functionParameterContent) {
        updatedFunctionParameters.set(id, {
          ...functionParameterContent,
          mappedParameterKey: matchingParameter,
        });
      }
    }
  });
  return updatedFunctionParameters;
};

const parseSubEffectIntoTransformCode = (
  transformCode: string[],
  subEffectData: {
    requiredFunctions: ShaderFunction[];
    transformation: string;
  }[]
) => {
  if (subEffectData.length === 0) {
    return transformCode;
  }

  return transformCode.flatMap((line) => {
    if (line.includes("{{SUB_EFFECTS}}")) {
      return (
        subEffectData
          // write subeffect transformations and function instantiations using the function parameter keys
          .flatMap((subEffect) => {
            const { requiredFunctions, transformation } = subEffect;
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
  transformConfigs: ShaderTransformationConfig[],
  shaderParameterMap: ShaderParameterMap,
  effectId: string,
  isSubEffect: boolean,
  subEffectData: {
    requiredFunctions: ShaderFunction[];
    transformation: string;
  }[]
): FormattedFunctionConfig[] => {
  const transformIds = transformConfigs.map(({ id }) => id);

  const formattedTransformConfigs = transformConfigs.map((config) => {
    const { id, transformCode, assignedVariableId } = config;

    const shaderFunctionType = getShaderFunctionType(
      assignedVariableId,
      isSubEffect
    );

    const updatedTransformCode = ROOT_FUNCTION_TYPES.includes(
      shaderFunctionType
    )
      ? parseSubEffectIntoTransformCode(transformCode, subEffectData)
      : transformCode;

    const functionDependencies = updatedTransformCode.flatMap((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => transformIds.includes(variable))
      ) {
        return variables.filter((variable) => transformIds.includes(variable));
      }
      return [];
    });

    // Get parameters from dependent functions
    const effectFunctionParameterMap = new Map();
    functionDependencies.forEach((depId) => {
      const dependentFunction = transformConfigs.find((f) => f.id === depId);
      if (!dependentFunction) return [];

      dependentFunction.transformCode.forEach((line) => {
        const variables = line
          .match(/{{(\w+)}}/g)
          ?.map((match) => match.replace(/[{}]/g, ""));
        if (
          variables &&
          variables.some((variable) => shaderParameterMap.has(variable))
        ) {
          variables.forEach((variable) => {
            if (shaderParameterMap.has(variable)) {
              effectFunctionParameterMap.set(
                variable,
                shaderParameterMap.get(variable)
              );
            }
          });
        }
      });
    });

    updatedTransformCode.forEach((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => shaderParameterMap.has(variable))
      ) {
        variables.forEach((variable) => {
          if (shaderParameterMap.has(variable)) {
            effectFunctionParameterMap.set(
              variable,
              shaderParameterMap.get(variable)
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
      transformCode: updatedTransformCode,
      functionType: shaderFunctionType,
      functionName: `${id}`,
      functionDependencyIds: [...new Set(functionDependencies)],
      functionParameters: effectFunctionParameterMap,
    };
  });

  /*
     if the parameter value is based of a function, check if the function is 
     already defined in the transform configs. Otherwise add the function to the transform configs
  */
  const functionBasedParameters = Array.from(
    shaderParameterMap.values()
  ).filter((parameter) => parameter.parameterConfig?.isFunctionBased);
  const matchingFunctionConfigs = functionBasedParameters.flatMap(
    ({ parameterConfig, id }) => {
      if (!parameterConfig) {
        return [];
      }
      const { functionConfig } = parameterConfig;
      const matchingFunctionConfig = formattedTransformConfigs.find(
        (config) => {
          return config.id === functionConfig?.functionId;
        }
      );
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
      console.warn(
        `No matching config ids found for - ${functionConfig?.functionId}`
      );
      return [];
    }
  );

  return [
    ...formattedTransformConfigs,
    ...(matchingFunctionConfigs as unknown as FormattedFunctionConfig[]),
  ] as unknown as FormattedFunctionConfig[];
};
