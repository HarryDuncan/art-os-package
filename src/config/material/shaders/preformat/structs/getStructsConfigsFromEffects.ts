import {
  DEFAULT_PARAMETERS,
  OperatorConfig,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
  StructConfig,
} from "../../schema";
import { getDefaultShaderVariableValueType } from "../../utils";

export const getStructsConfigsFromEffects = (
  vertexEffects: OperatorConfig[],
  fragmentEffects: OperatorConfig[]
): StructConfig[] => {
  const structsConfigs = vertexEffects.flatMap(({ effects }) => {
    return (
      effects?.flatMap(({ effectSchema }) => {
        if (
          effectSchema?.assignedVariableIds?.length &&
          effectSchema?.assignedVariableIds?.length > 1
        ) {
          return getStructConfigFromAssignedVariableIds(
            effectSchema.shaderTransformKey,
            effectSchema?.assignedVariableIds
          );
        }
        return [];
      }) || []
    );
  });
  const fragmentStructsConfigs = fragmentEffects.flatMap(({ effects }) => {
    return (
      effects?.flatMap(({ effectSchema }) => {
        if (
          effectSchema?.assignedVariableIds?.length &&
          effectSchema?.assignedVariableIds?.length > 1
        ) {
          return getStructConfigFromAssignedVariableIds(
            effectSchema.shaderTransformKey,
            effectSchema?.assignedVariableIds
          );
        }
        return [];
      }) || []
    );
  });
  return [...structsConfigs, ...fragmentStructsConfigs];
};

const getStructConfigFromAssignedVariableIds = (
  shaderTransformKey: string,
  assignedVariableIds: (keyof typeof SHADER_VARIABLE_TYPES | string)[]
) => {
  const structConfig: StructConfig = {
    key: `${shaderTransformKey}_result`,
    variables: assignedVariableIds.map((id) => {
      const valueType = getDefaultShaderVariableValueType(id as string);
      return {
        key: id,
        valueType,
      };
    }),
  };
  return structConfig;
};
