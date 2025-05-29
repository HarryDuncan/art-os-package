import { ParameterConfig } from "../../buildShader.types";
import { shaderSafeGuid } from "./functions";
import { FunctionParameter, ShaderEffectParameter } from "./types";

export const formatShaderEffectParameters = (
  defaultParameters: Partial<FunctionParameter>[],
  effectParameters: ParameterConfig[],
  effectGuid: string
): ShaderEffectParameter => {
  const defaultParamsMap = defaultParameters.reduce((acc, effect) => {
    const functionId = `${effect.id}_${shaderSafeGuid(effectGuid)}`;
    acc.set(effect.id!, {
      ...effect,
      functionId,
    } as FunctionParameter);
    return acc;
  }, new Map() as ShaderEffectParameter);

  const effectParamsMap = effectParameters.reduce((acc, effectParameter) => {
    const { id: parameterId, guid } = effectParameter;
    if (
      effectParameter.isUniform ||
      effectParameter.isAttribute ||
      effectParameter.isVarying
    ) {
      return acc;
    }
    acc.set(parameterId, {
      id: parameterId,
      valueType: effectParameter.valueType,
      functionId: `${parameterId}_${shaderSafeGuid(guid)}`,
    } as FunctionParameter);
    return acc;
  }, new Map() as ShaderEffectParameter);

  return new Map([...defaultParamsMap, ...effectParamsMap]);
};
