import {
  EffectConfig,
  SHADER_TYPES,
  ShaderTransformationSchema,
} from "../../../../../../..";

export const getTransformOutputConfig = (
  transformConfig: ShaderTransformationSchema,
  effectConfig: EffectConfig
) => {
  if (effectConfig.type === SHADER_TYPES.FUNCTION) {
    const { outputMapping } = effectConfig;
    const { outputConfig } = transformConfig;
    const parameterKey = Object.keys(outputMapping)[0];
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
