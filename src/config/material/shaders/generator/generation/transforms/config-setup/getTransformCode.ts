import {
  EffectConfig,
  SHADER_PROPERTY_TYPES,
  ShaderTransformationOutputConfig,
  ShaderTransformationSchema,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import { ShaderParameterMap } from "../../../types";

export const getTransformCode = (
  transformSchema: ShaderTransformationSchema,
  transformName: string,
  subEffectsKeys: string[],
  inputMap: ShaderParameterMap,
  effectConfig: EffectConfig
) => {
  const { transformCode, outputConfig } = transformSchema;
  const { guid } = effectConfig;

  const formattedEffectCodeLines = transformCode.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = inputMap.get(key);

      // todo - perhaps add a unique identifier
      if (subEffectsKeys.includes(key)) {
        return key;
      }
      if (!parameter) {
        //   const effectFunction = formattedFunctionConfigs.find(
        //     (f) => f.key === key
        //   );
        //   if (effectFunction) {
        //     const functionCall = formatNestedFunction(effectFunction, effectId);
        //     return `${functionCall}`;
        //   }

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
        return `${parameter.key}_${guid}`;
      }
      return match;
    });
  });

  const internalStructDeclaration = createInternalStructDeclaration(
    transformName,
    outputConfig
  );
  return [internalStructDeclaration, ...formattedEffectCodeLines];
};

const createInternalStructDeclaration = (
  transformName: string,
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  if (isStruct(outputConfig)) {
    return `${transformName}_result result;`;
  }
  return "";
};
