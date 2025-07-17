import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
  FragmentEffectConfig,
  VertexEffectConfig,
} from "../../buildShader.types";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { formatEffectCodeLines } from "./formatEffectCode";
import { getFunctionInputs } from "./functions";

export const transformationToFunction = (
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
      id: functionId,
      functionType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = getFunctionInputs(inputMap, shaderEffectId);

      const functionDeclaration = `${returnTypeString} ${functionName}(${[
        ...functionInputs,
      ].join(", ")}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        transformCode,
        inputMap,
        transformationConfigs,
        shaderEffectId
      );

      const shaderFunctionConfig = {
        id: functionId,
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
