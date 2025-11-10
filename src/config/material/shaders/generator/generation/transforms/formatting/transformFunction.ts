import {
  EffectConfig,
  ShaderTransformationOutputConfig,
  ShaderTransformationParameterConfig,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
} from "../../../types";
import { getFunctionInputs } from "../../helpers/parameterMap";
import { formatTransformCode } from "./transformCode";

export const transformFunction = (
  transformationConfigs: ShaderTransformationConfig[],
  shaderEffectConfig: EffectConfig
): DefinedEffectFunction[] => {
  const { guid: shaderEffectId } = shaderEffectConfig;

  return transformationConfigs.map(
    ({
      isSubFunction,
      outputConfig,
      inputMap,
      functionName,
      transformCode,
      key: functionKey,
      functionType,
      parameters,
    }) => {
      const functionInputs = isSubFunction
        ? getSubFunctionInputs(parameters)
        : getFunctionInputs(inputMap, shaderEffectId);
      // TODO - handle output config
      const functionDeclaration = createFunctionDeclaration(
        functionName,
        functionInputs,
        outputConfig
      );
      const functionSetups = createFunctionSetups(functionName, outputConfig);

      const formattedFunctionContent = formatTransformCode(
        transformCode,
        inputMap,
        transformationConfigs,
        shaderEffectId
      );

      const shaderFunctionConfig = {
        isSubFunction,
        outputConfig,
        key: functionKey,
        functionType,
        // returnValue,
        functionName: functionName,
        // assignedVariableId,
        inputMap,
        // TODO - handle output config
        functionDefinition: [
          functionDeclaration,
          functionSetups,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
      };
      return shaderFunctionConfig as DefinedEffectFunction;
    }
  );
};

const createFunctionDeclaration = (
  functionName: string,
  functionInputs: string[],
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  if (isStruct(outputConfig)) {
    return `${functionName}_result ${functionName}(${functionInputs.join(
      ", "
    )}){`;
  }
  return `${outputConfig[0].valueType} ${functionName}(${functionInputs.join(
    ", "
  )}){`;
};

const createFunctionSetups = (
  functionName: string,
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  if (isStruct(outputConfig)) {
    return `${functionName}_result result;`;
  }
  return "";
};

const getSubFunctionInputs = (
  parameters: ShaderTransformationParameterConfig[]
) => {
  console.log("parameters", parameters);
  return parameters.map(
    (parameter) => `${parameter.valueType} ${parameter.key}`
  );
};
