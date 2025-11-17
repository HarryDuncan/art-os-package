import {
  EffectConfig,
  SHADER_TYPES,
  ShaderTransformationSchema,
} from "../../../../../../..";
import { ShaderParameterMap } from "../../../types";
import { findKeyMatch } from "../../../../utils";

export const getTransformOutputConfig = (
  transformConfig: ShaderTransformationSchema,
  effectConfig: EffectConfig,
  parameterMap: ShaderParameterMap
) => {
  if (effectConfig.type === SHADER_TYPES.FUNCTION) {
    const { outputMapping } = effectConfig;
    const { outputConfig } = transformConfig;
    const parameterKey = Object.keys(outputMapping)[0];
    const assignedParameter = findKeyMatch(parameterKey, parameterMap);
    if (assignedParameter) {
      return [
        {
          ...outputConfig[0],
          key: assignedParameter,
        },
      ];
    }
    return [
      {
        ...outputConfig[0],
        key: parameterKey,
      },
    ];
  } else {
    const { outputConfig } = transformConfig;
    return outputConfig;
  }
};
