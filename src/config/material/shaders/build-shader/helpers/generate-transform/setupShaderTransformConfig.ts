import {
  ShaderEffectConfig,
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationConfig,
  ShaderTransformationSchema,
} from "../../buildShader.types";
import { SHADER_TYPES, SHADER_VARIABLE_TYPES } from "../../constants";
import { getInputIds, getShaderInputMap } from "../parameterMap";
import { DEFAULT_PARAMETER_KEYS, ROOT_FUNCTION_TYPES } from "./consts";
import { getShaderFunctionType } from "./functions";

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
          allParameters.some((p) => p.id === variable)
        )
      ) {
        variables.forEach((variable) => {
          if (allParameters.some((p) => p.id === variable)) {
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
export const setupShaderTransformationConfig = (
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
    const allInputIds = Array.from(
      new Set([...inputIds, ...functionDependencies])
    );
    const defaultInputIds = allInputIds
      .filter((key) => DEFAULT_PARAMETER_KEYS.includes(key))
      .sort((a, b) => a.localeCompare(b));
    const nonDefaultInputIds = allInputIds
      .filter((key) => !DEFAULT_PARAMETER_KEYS.includes(key))
      .sort((a, b) => a.localeCompare(b));
    const formattedInputIds = [...defaultInputIds, ...nonDefaultInputIds];

    const inputMap = getShaderInputMap(
      parameters,
      formattedInputIds,
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

  return formattedTransformConfigs as unknown as ShaderTransformationConfig[];
};
