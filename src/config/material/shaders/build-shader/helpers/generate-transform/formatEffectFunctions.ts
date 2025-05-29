import { ParameterConfig } from "../../buildShader.types";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { formatEffectCodeLines } from "./formatEffectCode";
import { FormattedFunctionConfig, ShaderEffectParameter } from "./types";

export const formatEffectFunctions = (
  formattedFunctionConfigs: FormattedFunctionConfig[],
  shaderEffectParameters: ShaderEffectParameter,
  effectParameters: ParameterConfig[]
) =>
  formattedFunctionConfigs.map(
    ({
      returnValue,
      functionName,
      functionParameters,
      effectCode,
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
        effectCode,
        shaderEffectParameters,
        effectParameters,
        formattedFunctionConfigs
      );

      const shaderFunctionConfig = {
        id: functionId,
        functionType,
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
