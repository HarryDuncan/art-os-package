import {
  ShaderTransformationConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../../constants/shader.consts";
import { getFunctionInputs } from "./functions";

const formatNestedFunction = (
  transformationConfig: ShaderTransformationConfig,
  defaultInputIds: string[],
  shaderEffectParameters: ShaderParameterMap,
  shaderEffectId: string
) => {
  const functionInputs = getFunctionInputs(
    shaderEffectParameters,
    defaultInputIds ?? [],
    shaderEffectId,
    false
  );

  return `${transformationConfig.functionName}(${functionInputs.join(",")});`;
};

export const formatEffectCodeLines = (
  effectCodeLines: string[],
  inputIds: string[],
  shaderEffectParameters: ShaderParameterMap,
  formattedFunctionConfigs: ShaderTransformationConfig[],
  effectId: string,
  isFragment: boolean
) => {
  return effectCodeLines.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = shaderEffectParameters.get(key);

      if (key === "SUB_EFFECTS") {
        return "";
      }
      if (!parameter) {
        const effectFunction = formattedFunctionConfigs.find(
          (f) => f.id === key
        );
        if (effectFunction) {
          const functionCall = formatNestedFunction(
            effectFunction,
            inputIds,
            shaderEffectParameters,
            effectId
          );
          return `${functionCall}`;
        }

        return match;
      }
      if (
        isFragment &&
        parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
      ) {
        return `${parameter.id}_varying`;
      }
      if (parameter.shaderParameterId) {
        return `${parameter.shaderParameterId}`;
      } else if (inputIds.includes(key)) {
        return `${parameter.id}_${effectId}`;
      }
      return match;
    });
  });
};
