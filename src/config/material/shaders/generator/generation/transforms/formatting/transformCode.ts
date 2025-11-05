import { SHADER_PROPERTY_TYPES } from "../../../../schema";
import { ShaderParameterMap, ShaderTransformationConfig } from "../../../types";
import { getFunctionInputs } from "../../helpers/parameterMap";

const formatNestedFunction = (
  transformSchema: ShaderTransformationConfig,
  shaderEffectId: string
) => {
  const functionInputs = getFunctionInputs(
    transformSchema.inputMap,
    shaderEffectId,
    false
  );

  return `${transformSchema.functionName}(${functionInputs.join(",")});`;
};

export const formatTransformCode = (
  effectCodeLines: string[],
  inputMap: ShaderParameterMap,
  formattedFunctionConfigs: ShaderTransformationConfig[],
  effectId: string
) => {
  const subFunctions = formattedFunctionConfigs.filter((f) => f.isSubFunction);
  return effectCodeLines.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = inputMap.get(key);

      if (key === "uTime") {
        // console.log(inputMap);
        // console.log(effectCodeLines);
      }
      // todo - perhaps add a unique identifier
      if (subFunctions.some((f) => f.functionName === key)) {
        return key;
      }
      if (!parameter) {
        const effectFunction = formattedFunctionConfigs.find(
          (f) => f.key === key
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
        return `${parameter.key}_${effectId}`;
      }
      return match;
    });
  });
};
