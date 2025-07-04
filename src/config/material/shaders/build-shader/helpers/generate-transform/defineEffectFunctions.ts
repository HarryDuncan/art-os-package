import {
  DefinedEffectFunction,
  FormattedFunctionConfig,
  ParameterConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { formatEffectCodeLines } from "./formatEffectCode";

export const defineEffectFunctions = (
  formattedFunctionConfigs: FormattedFunctionConfig[],
  shaderEffectParameters: ShaderParameterMap,
  effectParameters: ParameterConfig[]
): DefinedEffectFunction[] =>
  formattedFunctionConfigs.map(
    ({
      returnValue,
      functionName,
      functionParameters,
      transformCode,
      assignedVariableId,
      id: functionId,
      dontDeclare,
      functionType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);

      const functionInputs = Array.from(functionParameters.values()).map(
        ({ functionId, valueType }) => {
          return `${shaderValueTypeInstantiation(valueType)} ${functionId}`;
        }
      );
      const functionDeclaration = `${returnTypeString} ${functionName}(${functionInputs.join(
        ", "
      )}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        transformCode,
        shaderEffectParameters,
        effectParameters,
        formattedFunctionConfigs
      );

      const shaderFunctionConfig = {
        id: functionId,
        functionType,
        returnValue,
        functionName: functionName,
        assignedVariableId,
        functionParameters,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
        dontDeclare,
      };
      return shaderFunctionConfig;
    }
  );
