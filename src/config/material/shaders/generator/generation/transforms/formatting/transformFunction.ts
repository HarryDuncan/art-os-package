import {
  FragmentEffectConfig,
  ShaderTransformationOutputConfig,
  VertexEffectConfig,
} from "../../../../schema";
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
  const isStruct = outputConfig.length > 1;
  if (isStruct) {
    // return `struct ${functionName} {
    //   ${outputConfig.map((output) => `${output.key}: ${output.valueType}`).join(", ")};
    // }`;
    //todo - return a struct declaration
  }

  const { valueType } = outputConfig[0];
  return `${valueType} ${functionName}(${functionInputs.join(", ")}){`;
};
