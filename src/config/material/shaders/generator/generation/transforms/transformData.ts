import { SHADER_VARIABLE_TYPES, ShaderEffectConfig } from "../../../schema";
import {
  ADVANCED_SHADER_VARIABLE_EFFECT_CODE,
  FUNCTION_TYPES,
} from "../../consts";
import {
  AdvancedShaderVariableMap,
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationSchema,
  TransformData,
} from "../../types";
import { functionInstantiation } from "../helpers/functionInstantiation";
import { setupShaderTransformationConfigs } from "./formatting/transformConfig";
import { transformFunction } from "./formatting/transformFunction";

export const generateShaderTransformData = (
  effect: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { effectSchema } = effect;
  if (effectSchema) {
    const { transformSchema, functions, assignedVariableIds } = effectSchema;
    const { transformationFunctions, transformation, advancedShaderVariables } =
      generateTransform(
        transformSchema as unknown as ShaderTransformationSchema[],
        effect,
        parameterMap
      );

    return {
      transformation,
      requiredFunctions: [...(functions || []), ...transformationFunctions],
      assignedVariableIds,
      advancedShaderVariables,
    } as TransformData;
  }
  return null;
};

export const generateTransform = (
  transformConfig: ShaderTransformationSchema[],
  effectConfig: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): {
  transformation: string[];
  transformationFunctions: ShaderFunction[];
  mainFunctionInstantiations: string[];
  advancedShaderVariables: AdvancedShaderVariableMap;
} => {
  const { guid: effectId } = effectConfig;
  // const subEffectDataArray =
  //   subEffects?.flatMap((subEffect) => {
  //     const subEffectData = generateShaderTransformData(
  //       subEffect,
  //       parameterMap,
  //       true
  //     );
  //     if (subEffectData) {
  //       return subEffectData;
  //     }
  //     return [];
  //   }) ?? [];

  const transformationConfigs = setupShaderTransformationConfigs(
    transformConfig,
    effectConfig,

    parameterMap
  );

  const effectFunctions = transformFunction(
    transformationConfigs,
    effectConfig
  );

  // todo - handle output config
  const shaderVariableTypes: string[] = [];
  // transformationConfigs.flatMap(
  //   ({ assignedVariableIds }) => {
  //     return assignedVariableIds ?? [];
  //   }
  // );
  const advancedShaderVariables = shaderVariableTypes.reduce(
    (map, assignedVariableId) => {
      const transformCode =
        ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId];
      if (transformCode) {
        map.set(assignedVariableId, [
          ...(map.get(assignedVariableId) || []),
          transformCode,
        ]);
      }
      return map;
    },
    new Map() as AdvancedShaderVariableMap
  );

  const mainFunctionInstantiations = effectFunctions
    .sort((a, b) =>
      a.dontDeclare === b.dontDeclare ? 0 : a.dontDeclare ? -1 : 1
    )
    .flatMap(({ inputMap, assignedVariableId, functionName, functionType }) => {
      if (
        !assignedVariableId ||
        FUNCTION_TYPES.VERTEX_SUB_EFFECT === functionType ||
        FUNCTION_TYPES.FRAGMENT_SUB_EFFECT === functionType ||
        (ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId] &&
          isSubEffect) ||
        assignedVariableId === SHADER_VARIABLE_TYPES.SUB_FUNCTION
      ) {
        return [];
      }
      return functionInstantiation(
        assignedVariableId,
        functionName,
        inputMap,
        effectId
      );
    });

  const transformation = [...mainFunctionInstantiations];

  const transformationFunctions = [
    ...effectFunctions.filter(({ dontDeclare }) => {
      return !dontDeclare;
    }),
    // ...subEffectDataArray.flatMap(({ requiredFunctions }) => requiredFunctions),
  ];
  return {
    transformation,
    mainFunctionInstantiations,
    transformationFunctions,
    advancedShaderVariables,
  };
};
