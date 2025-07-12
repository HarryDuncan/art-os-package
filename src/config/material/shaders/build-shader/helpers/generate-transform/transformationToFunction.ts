import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
  ShaderParameterMap,
  FragmentEffectConfig,
  VertexEffectConfig,
} from "../../buildShader.types";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { formatEffectCodeLines } from "./formatEffectCode";
import { getFunctionInputs } from "./functions";
import { SHADER_TYPES } from "../../constants";

export const transformationToFunction = (
  transformationConfigs: ShaderTransformationConfig[],
  shaderEffectConfig: FragmentEffectConfig | VertexEffectConfig,
  parameters: ShaderParameterMap
): DefinedEffectFunction[] => {
  const { id: shaderEffectId } = shaderEffectConfig;
  const isFragment = shaderEffectConfig.shaderType === SHADER_TYPES.FRAGMENT;
  return transformationConfigs.map(
    ({
      returnValue,
      inputIds,
      functionName,
      transformCode,
      assignedVariableId,
      id: functionId,
      dontDeclare,
      functionType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);

      const functionInputs = getFunctionInputs(
        parameters,
        inputIds ?? [],
        shaderEffectId
      );

      const functionDeclaration = `${returnTypeString} ${functionName}(${[
        ...functionInputs,
      ].join(", ")}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        transformCode,
        inputIds ?? [],
        parameters,
        transformationConfigs,
        shaderEffectId,
        isFragment
      );

      const shaderFunctionConfig = {
        id: functionId,
        functionType,
        returnValue,
        functionName: functionName,
        assignedVariableId,
        inputIds,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
        dontDeclare,
      };
      return shaderFunctionConfig as DefinedEffectFunction;
    }
  );
};
