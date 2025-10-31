import {
  OperatorConfig,
  SHADER_PROPERTY_VALUE_TYPES,
  ShaderTransformationOutputConfig,
  StructConfig,
} from "../../schema";

export const getStructsConfigsFromEffects = (
  vertexEffects: OperatorConfig[],
  fragmentEffects: OperatorConfig[]
): StructConfig[] => {
  const structsConfigs = vertexEffects.flatMap(
    ({ effects }) =>
      effects?.flatMap(
        ({ effectSchemas }) =>
          effectSchemas?.flatMap((schema) => {
            return schema.outputConfig.length > 1
              ? getStructConfigFromOutputConfig(
                  schema.key,
                  schema?.outputConfig
                )
              : [];
          }) || []
      ) || []
  );
  const fragmentStructsConfigs = fragmentEffects.flatMap(
    ({ effects }) =>
      effects?.flatMap(
        ({ effectSchemas }) =>
          effectSchemas?.flatMap((schema) => {
            return schema.outputConfig.length > 1
              ? getStructConfigFromOutputConfig(
                  schema.key,
                  schema?.outputConfig
                )
              : [];
          }) || []
      ) || []
  );
  return [...structsConfigs, ...fragmentStructsConfigs];
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
