import { SHADER_PROPERTY_TYPES } from "../../../../../../consts";
import {
  ShaderTransformationConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { getFunctionInputs } from "./functions";

const formatNestedFunction = (
  transformationConfig: ShaderTransformationConfig,
  shaderEffectId: string
) => {
  const functionInputs = getFunctionInputs(
    transformationConfig.inputMap,
    shaderEffectId,
    false
  );

  return `${transformationConfig.functionName}(${functionInputs.join(",")});`;
};

export const formatEffectCodeLines = (
  effectCodeLines: string[],
  inputMap: ShaderParameterMap,
  formattedFunctionConfigs: ShaderTransformationConfig[],
  effectId: string
) => {
  return effectCodeLines.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = inputMap.get(key);

      if (key === "SUB_EFFECTS") {
        return "";
      }
      if (!parameter) {
        const effectFunction = formattedFunctionConfigs.find(
          (f) => f.id === key
        );
        if (effectFunction) {
          const functionCall = formatNestedFunction(effectFunction, effectId);
          return `${functionCall}`;
        }

        return match;
      }

      if (
        parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE ||
        parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING ||
        parameter.parameterType === SHADER_PROPERTY_TYPES.CONSTANT
      ) {
        return `${parameter.shaderParameterId}`;
      }

      if (inputMap.has(key)) {
        return `${parameter.id}_${effectId}`;
      }
      return match;
    });
  });
};
