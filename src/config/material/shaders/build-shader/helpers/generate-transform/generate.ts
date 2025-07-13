import {
  EffectFunctionConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import { applyEffectWrapper } from "../../effect-functions/applyEffectWrapper";
import { generateShaderTransformData } from "./generateTransform";

export const transformSetup = (
  wrapperFunction: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
) => {
  const { effects } = wrapperFunction;
  const effectTransformationData = effects.flatMap((effect) => {
    const data = generateShaderTransformData(effect, parameterMap);
    if (data) {
      return {
        id: effect.id,
        ...data,
      };
    }
    return [];
  });

  return applyEffectWrapper(
    wrapperFunction,
    effectTransformationData,
    parameterMap
  );
};
