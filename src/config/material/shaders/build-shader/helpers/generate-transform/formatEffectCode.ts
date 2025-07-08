import {
  FormattedFunctionConfig,
  ParameterConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../../constants/shader.consts";

const formatNestedFunction = (
  functionConfig: FormattedFunctionConfig,
  shaderEffectParameters: ShaderParameterMap
) => {
  const { functionParameters } = functionConfig;
  const shaderParameterIds = Array.from(functionParameters.keys()).map((id) => {
    const parameter = shaderEffectParameters.get(id);
    if (!parameter) {
      return null;
    }
    return `${parameter.shaderParameterId}`;
  });
  return `${functionConfig.functionName}(${shaderParameterIds.join(",")});`;
};

export const formatEffectCodeLines = (
  effectCodeLines: string[],
  shaderEffectParameters: ShaderParameterMap,
  effectParameters: ParameterConfig[],
  formattedFunctionConfigs: FormattedFunctionConfig[]
) => {
  return effectCodeLines.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = shaderEffectParameters.get(key);

      if (key === "SUB_EFFECTS") {
        return "";
      }
      if (!parameter) {
        const shaderVariable = effectParameters.find((p) => p.id === key);
        if (shaderVariable?.parameterType === SHADER_PROPERTY_TYPES.VARYING) {
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
            shaderEffectParameters
          );
          return `${functionCall}`;
        }

        return match;
      }

      return `${parameter.shaderParameterId}`;
    });
  });
};
