import {
  FunctionParameter,
  ParameterConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { FragmentEffectProps } from "../../fragment-effects/fragmentShader.types";
import { VertexEffectProps } from "../../vertex-effects/vertexEffects.types";

export const setupEffectParameters = (
  effectProps: VertexEffectProps | FragmentEffectProps,
  defaultParameters: Partial<FunctionParameter>[]
): {
  shaderParameterMap: ShaderParameterMap;
  effectParameters: ParameterConfig[];
} => {
  const { id, effectParameters, subEffects } = effectProps;
  const allEffectParameters = [
    ...effectParameters,
    ...(subEffects?.flatMap(({ effectParameters }) => effectParameters) ?? []),
  ];
  const shaderParameterMap = formatShaderEffectParameters(
    defaultParameters,
    allEffectParameters,
    id
  );

  return {
    shaderParameterMap,
    effectParameters: allEffectParameters,
  };
};

export const formatShaderEffectParameters = (
  defaultParameters: Partial<FunctionParameter>[],
  effectParameters: ParameterConfig[],
  effectGuid: string
): ShaderParameterMap => {
  const defaultParamsMap = defaultParameters.reduce((acc, effect) => {
    acc.set(effect.id!, {
      ...effect,
      shaderParameterId: `${effect.id}_${effectGuid}`,
    } as FunctionParameter);
    return acc;
  }, new Map() as ShaderParameterMap);

  const effectParamsMap = effectParameters.reduce((acc, effectParameter) => {
    const { id: parameterId, guid } = effectParameter;
    if (effectParameter.isAttribute) {
      return acc;
    } else if (effectParameter.isVarying) {
      acc.set(parameterId, {
        id: parameterId,
        valueType: effectParameter.valueType,
        shaderParameterId: parameterId,
        parameterConfig: effectParameter,
      } as FunctionParameter);
    } else {
      acc.set(parameterId, {
        id: parameterId,
        valueType: effectParameter.valueType,
        shaderParameterId: `${parameterId}_${guid}`,
        parameterConfig: effectParameter,
      } as FunctionParameter);
    }

    return acc;
  }, new Map() as ShaderParameterMap);

  return new Map([...defaultParamsMap, ...effectParamsMap]);
};
