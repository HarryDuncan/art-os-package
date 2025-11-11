import {
  EffectConfig,
  SHADER_PROPERTY_VALUE_TYPES,
  ShaderTransformationOutputConfig,
  StructConfig,
} from "../../schema";

export const getStructsConfigsFromEffects = (
  effectsWithSchemas: EffectConfig[]
): StructConfig[] => {
  const structsConfigs = effectsWithSchemas.flatMap(
    ({ transformSchema }) =>
      transformSchema?.flatMap((schema) => {
        return schema.outputConfig.length > 1
          ? getStructConfigFromOutputConfig(schema.key, schema?.outputConfig)
          : [];
      }) || []
  );
  return structsConfigs;
};

const getStructConfigFromOutputConfig = (
  shaderTransformKey: string,
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  const structConfig: StructConfig = {
    key: `${shaderTransformKey}_result`,
    variables: outputConfig.map((output) => {
      return {
        key: output.key,
        valueType: output.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      };
    }),
  };
  return structConfig;
};
