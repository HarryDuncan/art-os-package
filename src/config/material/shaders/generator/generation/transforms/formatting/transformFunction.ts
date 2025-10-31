import {
  FragmentEffectConfig,
  ShaderTransformationOutputConfig,
  VertexEffectConfig,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import { getStructConfigFromOutputConfig } from "../../../../utils/struct";
import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
} from "../../../types";
import { getFunctionInputs } from "../../helpers/parameterMap";
import { formatTransformCode } from "./transformCode";

export const transformFunction = (
  transformationConfigs: ShaderTransformationConfig[],
  shaderEffectConfig: FragmentEffectConfig | VertexEffectConfig
): DefinedEffectFunction[] => {
  const { guid: shaderEffectId } = shaderEffectConfig;
  return transformationConfigs.map(
    ({
      isRoot,
      outputConfig,
      inputMap,
      functionName,
      transformCode,
      // assignedVariableId,
      key: functionKey,
      functionType,
    }) => {
      //const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = getFunctionInputs(inputMap, shaderEffectId);
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
        isRoot,
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
  const valueType =
    outputConfig.length > 1
      ? `${functionName}_result`
      : outputConfig[0].valueType;
  return `${valueType} ${functionName}(${functionInputs.join(", ")}){`;
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
