import { FragmentEffectConfig, VertexEffectConfig } from "../../../../schema";
import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
} from "../../../types";
import { getFunctionInputs } from "../../helpers/parameterMap";
import { shaderValueTypeInstantiation } from "../../helpers/shaderValues";
import { formatTransformCode } from "./transformCode";

export const transformFunction = (
  transformationConfigs: ShaderTransformationConfig[],
  shaderEffectConfig: FragmentEffectConfig | VertexEffectConfig
): DefinedEffectFunction[] => {
  const { guid: shaderEffectId } = shaderEffectConfig;
  return transformationConfigs.map(
    ({
      returnValue,
      inputMap,
      functionName,
      transformCode,
      assignedVariableId,
      key: functionKey,
      functionType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = getFunctionInputs(inputMap, shaderEffectId);

      const functionDeclaration = `${returnTypeString} ${functionName}(${[
        ...functionInputs,
      ].join(", ")}){`;

      const formattedFunctionContent = formatTransformCode(
        transformCode,
        inputMap,
        transformationConfigs,
        shaderEffectId
      );

      const shaderFunctionConfig = {
        key: functionKey,
        functionType,
        returnValue,
        functionName: functionName,
        assignedVariableId,
        inputMap,
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
