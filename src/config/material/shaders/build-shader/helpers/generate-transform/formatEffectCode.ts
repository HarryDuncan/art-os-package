import { ParameterConfig } from "../../buildShader.types";
import { FunctionParameter, FormattedFunctionConfig } from "./types";

const formatNestedFunction = (
  functionConfig: FormattedFunctionConfig,
  shaderParameters: FunctionParameter[]
) => {
  const { functionParameterIds } = functionConfig;
  const shaderParameterIds = functionParameterIds.map((id) => {
    const parameter = shaderParameters.find((p) => p.id === id);
    if (!parameter) {
      return null;
    }
    return `${parameter.functionId}`;
  });
  return `${functionConfig.functionName}(${shaderParameterIds.join(",")});`;
};

export const formatEffectCodeLines = (
  effectCodeLines: string[],
  shaderParameters: FunctionParameter[],
  effectParameters: ParameterConfig[],
  formattedFunctionConfigs: FormattedFunctionConfig[]
) => {
  return effectCodeLines.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = shaderParameters.find((p) => p.id === key);

      if (!parameter) {
        const shaderVariable = effectParameters.find((p) => p.id === key);
        if (shaderVariable?.isVarying) {
          return shaderVariable?.varyingConfig?.isAttributeReference
            ? `${shaderVariable.id}_varying`
            : `${shaderVariable.id}`;
        }
        if (shaderVariable) {
          return `${shaderVariable.id}`;
        }

        const effectFunction = formattedFunctionConfigs.find(
          (f) => f.id === key
        );
        if (effectFunction) {
          const functionCall = formatNestedFunction(
            effectFunction,
            shaderParameters
          );
          return `${functionCall}`;
        }

        return match;
      }
      return `${parameter.functionId}`;
    });
  });
};
