import {
  EffectConfig,
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
  // SHADER_PROPERTY_VALUE_TYPES,
  SHADER_TYPES,
  // SHADER_VARIABLE_TYPES,
  ShaderEffectConfig,
  ShaderTransformationSchema,
} from "../../../../schema";
import { FUNCTION_TYPES } from "../../../consts";
import {
  ShaderParameter,
  // ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationConfig,
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
  const transformKeys = transformConfigs.map(({ key }) => key);
  const functionDependencies = transformCode.flatMap((line) => {
    const variables = line
      .match(/{{(\w+)}}/g)
      ?.map((match) => match.replace(/[{}]/g, ""));
    if (
      variables &&
      variables.some((variable) => transformKeys.includes(variable))
    ) {
      return variables.filter((variable) => transformKeys.includes(variable));
    }
    return [];
  });

  const allParameters = Array.from(shaderParameterMap.values());
  const parameterIds: string[] = [];
  functionDependencies.forEach((depKey) => {
    const dependentFunction = transformConfigs.find((f) => f.key === depKey);
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
// const parseSubEffectIntoTransformCode = (
//   transformCode: string[]
// ) => {
//   return transformCode.flatMap((line) => {
//     if (line.includes("{{SUB_EFFECTS}}")) {
//       return (
//         subEffectData
//           // write subeffect transformations and function instantiations using the function parameter keys
//           .flatMap((subEffect) => {
//             const { requiredFunctions, transformation } = subEffect;
//             const selectedFunction = requiredFunctions[0];
//             const subEffectAssignedVariableId =
//               selectedFunction.assignedVariableId ===
//               SHADER_VARIABLE_TYPES.VERTEX_POINT
//                 ? "pointPosition"
//                 : "fragColor";

//             const functionParameters = Array.from(
//               selectedFunction.functionParameters?.values() ?? []
//             )
//               .map((value) => {
//                 return `{{${value.key}}}`;
//               })
//               .join(",");
//             const functionInstantiation = `{{${subEffectAssignedVariableId}}} = ${selectedFunction.functionName}(${functionParameters});`;
//             return [transformation, functionInstantiation];
//           })
//           .join("\n")
//       );
//     }
//     return line;
//   });
// };

export const transformationConfigFromFunctionParameter = (
  functionParameter: ParameterConfig,
  parameterMap: ShaderParameterMap
  // transformConfigs: ShaderTransformationSchema[]
): ShaderTransformationConfig[] | null => {
  const { inputMapping, schemaId, transformSchema } =
    functionParameter.functionConfig ?? {};
  if (!inputMapping || !transformSchema) return null;

  return transformSchema.flatMap(
    ({ key, transformCode, outputConfig, isSubFunction, parameters }) => {
      if (!transformCode) return [];

      const functionParameters = getParametersFromInputMapping(
        inputMapping,
        parameterMap
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

      let newOutputConfig = outputConfig;
      if (!isSubFunction && outputConfig.length === 1) {
        newOutputConfig = [
          {
            ...outputConfig[0],
            key: functionParameter.shaderParameterId || "function",
          },
        ];
      }

      return {
        key: schemaId || "function",
        transformCode,
        functionType: isSubFunction
          ? FUNCTION_TYPES.STATIC
          : FUNCTION_TYPES.CONFIGURED_STATIC,
        functionName: key,
        inputMap,
        isSubFunction,
        outputConfig: newOutputConfig,
        parameters: parameters || [],
      };
    }
  );
};

export const getTransformConfigForFunctionMappedParameter = (
  mappedParameter: ShaderParameter,
  functionConfig: EffectConfig,
  parameterMap: ShaderParameterMap
) => {
  const { inputMapping, schemaId, transformSchema } = functionConfig;
  if (!inputMapping || !transformSchema) return null;
  return transformSchema.flatMap(
    ({ key, transformCode, outputConfig, isSubFunction, parameters }) => {
      if (!transformCode) return [];

      const functionParameters = getParametersFromInputMapping(
        inputMapping,
        parameterMap
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

      let newOutputConfig = outputConfig;
      if (!isSubFunction && outputConfig.length === 1) {
        newOutputConfig = [
          {
            ...outputConfig[0],
            key: mappedParameter.shaderParameterId || "function",
          },
        ];
      }

      return {
        key: schemaId || "function",
        transformCode,
        functionType: isSubFunction
          ? FUNCTION_TYPES.STATIC
          : FUNCTION_TYPES.CONFIGURED_STATIC,
        functionName: key,
        inputMap,
        isSubFunction,
        outputConfig: newOutputConfig,
        parameters: parameters || [],
      };
    }
  );
};

export const setupShaderTransformationConfigs = (
  transformConfigs: ShaderTransformationSchema[],
  shaderEffectConfig: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): ShaderTransformationConfig[] => {
  const formattedTransformConfigs = transformConfigs.map((config) => {
    const { key, transformCode, isSubFunction } = config;
    const shaderFunctionType = getShaderFunctionType(
      isSubFunction,
      shaderEffectConfig.shaderType
    );
    const updatedTransformCode = transformCode;
    const inputIds = getInputIds(
      updatedTransformCode,
      shaderEffectConfig.inputMapping ?? {},
      shaderEffectConfig.shaderType === SHADER_TYPES.FRAGMENT
    );

    const functionDependencies = getFunctionDependencies(
      transformConfigs,
      updatedTransformCode,
      parameterMap
    );

    // Get default ids first, then the rest, both sorted alphabetically
    const sortedInputIds = sortInputIds([...inputIds, ...functionDependencies]);
    const inputMap = getShaderInputMap(
      parameterMap,
      sortedInputIds,
      shaderEffectConfig
    );
    console.log("inputMap", inputMap);
    return {
      ...config,
      transformCode: updatedTransformCode,
      functionType: shaderFunctionType,
      functionName: `${key}`,
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
        parameterMap
      );
      if (transformation) {
        return transformation;
      }
      return [];
    }
  );

  return [
    ...(formattedTransformConfigs as unknown as ShaderTransformationConfig[]),
    ...(transformations as unknown as ShaderTransformationConfig[]),
  ];
};
