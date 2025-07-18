import {
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
  SHADER_TYPES,
  SHADER_VARIABLE_TYPES,
  ShaderEffectConfig,
  getFunctionSchema,
} from "../../../../schema";
import {} from "../../../../schema/schema";
import { FUNCTION_TYPES, ROOT_FUNCTION_TYPES } from "../../../consts";
import {
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationConfig,
  ShaderTransformationSchema,
} from "../../../types";
import {
  getInputIds,
  getParametersFromInputMapping,
  getShaderInputMap,
  sortInputIds,
} from "../../helpers/parameterMap";
import { getShaderFunctionType } from "../../helpers/shaderFunctionType";

const getFunctionDependencies = (
  transformConfigs: ShaderTransformationSchema[],
  transformCode: string[],
  shaderParameterMap: ShaderParameterMap
) => {
  const transformIds = transformConfigs.map(({ id }) => id);
  const functionDependencies = transformCode.flatMap((line) => {
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
  const allParameters = Array.from(shaderParameterMap.values());
  const parameterIds: string[] = [];
  functionDependencies.forEach((depId) => {
    const dependentFunction = transformConfigs.find((f) => f.id === depId);
    if (!dependentFunction) return [];
    dependentFunction.transformCode.forEach((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));

      if (
        variables &&
        variables.some((variable) =>
          allParameters.some((p) => p.key === variable)
        )
      ) {
        variables.forEach((variable) => {
          if (allParameters.some((p) => p.key === variable)) {
            parameterIds.push(variable);
          }
        });
      }
    });
  });
  return parameterIds;
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
                return `{{${value.key}}}`;
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

export const transformationConfigFromFunctionParameter = (
  functionParameter: ParameterConfig,
  parameters: ShaderParameterMap
  // transformConfigs: ShaderTransformationSchema[]
): ShaderTransformationConfig | null => {
  const { inputMapping, functionId } = functionParameter.functionConfig ?? {};
  if (!inputMapping || !functionId) return null;
  const functionCode = getFunctionSchema(functionId)?.transformCode;
  if (!functionCode) return null;
  const functionParameters = getParametersFromInputMapping(
    inputMapping,
    parameters
  );

  const sortedInputIds = sortInputIds([
    ...functionParameters.map((p) => p.key),
  ]);
  const sortedFunctionParameters = sortedInputIds.map((id) => {
    return functionParameters.find((p) => p.key === id);
  }) as ParameterConfig[];
  const inputMap = new Map();
  sortedFunctionParameters.forEach((parameter) => {
    inputMap.set(parameter.key, parameter);
  });

  return {
    id: functionId,
    transformCode: functionCode,
    functionType: FUNCTION_TYPES.STATIC,
    functionName: functionId,
    inputMap,
    returnValue: functionParameter.valueType,
    assignedVariableId: functionParameter.key,
  };
};
export const setupShaderTransformationConfigs = (
  transformConfigs: ShaderTransformationSchema[],
  shaderEffectConfig: ShaderEffectConfig,
  isSubEffect: boolean,
  subEffectData: {
    requiredFunctions: ShaderFunction[];
    transformation: string;
  }[],
  parameters: ShaderParameterMap
): ShaderTransformationConfig[] => {
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

    const inputIds = getInputIds(
      updatedTransformCode,
      shaderEffectConfig.inputMapping ?? {},
      shaderEffectConfig.shaderType === SHADER_TYPES.FRAGMENT
    );

    const functionDependencies = getFunctionDependencies(
      transformConfigs,
      updatedTransformCode,
      parameters
    );

    // Get default ids first, then the rest, both sorted alphabetically
    const sortedInputIds = sortInputIds([...inputIds, ...functionDependencies]);

    const inputMap = getShaderInputMap(
      parameters,
      sortedInputIds,
      shaderEffectConfig
    );

    return {
      ...config,
      transformCode: updatedTransformCode,
      functionType: shaderFunctionType,
      functionName: `${id}`,
      inputMap,
    };
  });

  const functionBasedParameters = formattedTransformConfigs.flatMap(
    (config) => {
      return Array.from(config.inputMap.values()).filter(
        (parameter) =>
          parameter?.isFunctionBased &&
          parameter.parameterType !== SHADER_PROPERTY_TYPES.VARYING
      );
    }
  );

  const transformations = functionBasedParameters.flatMap(
    (functionParameter) => {
      const transformation = transformationConfigFromFunctionParameter(
        functionParameter,
        parameters
      );
      if (transformation) {
        return [transformation];
      }
      return [];
    }
  );

  /*
       if the parameter value is based of a function, check if the function is 
       already defined in the transform configs. Otherwise add the function to the transform configs
    */
  //   const functionBasedParameters = Array.from(
  //     shaderParameterMap.values()
  //   ).filter((parameter) => parameter.parameterConfig?.isFunctionBased);

  //   const matchingFunctionConfigs = functionBasedParameters.flatMap(
  //     ({ parameterConfig, id }) => {
  //       if (!parameterConfig) {
  //         return [];
  //       }

  //       const { functionConfig } = parameterConfig;
  //       const matchingFunctionConfig = formattedTransformConfigs.find(
  //         (config) => {
  //           return config.id === functionConfig?.functionId;
  //         }
  //       );
  //       if (matchingFunctionConfig) {
  //         const instantiationParameters = getFunctionParameterMapping(
  //           matchingFunctionConfig as unknown as ShaderTransformationConfig,
  //           functionConfig
  //         );

  //         const assignedVariableId = id;
  //         return {
  //           ...matchingFunctionConfig,
  //           functionParameters: instantiationParameters,
  //           assignedVariableId,
  //           dontDeclare: true,
  //         };
  //       }
  //       console.warn(
  //         `No matching config ids found for - ${functionConfig?.functionId}`
  //       );
  //       return [];
  //     }
  //   );

  return [
    ...(formattedTransformConfigs as unknown as ShaderTransformationConfig[]),
    ...(transformations as unknown as ShaderTransformationConfig[]),
  ];
};
