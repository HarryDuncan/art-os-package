import { ShaderEffectConfig } from "../../../schema";
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
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean = false
): TransformData | null => {
  const { effectSchema } = effect;
  if (effectSchema) {
    const { transformSchema, assignedVariableId, functions } = effectSchema;
    const { transformationFunctions, transformation, advancedShaderVariables } =
      generateTransform(
        transformSchema as ShaderTransformationSchema[],
        effect,
        parameterMap,
        isSubEffect
      );

    return {
      transformation,
      requiredFunctions: [...(functions || []), ...transformationFunctions],
      assignedVariableId,
      advancedShaderVariables,
    } as TransformData;
  }
  return null;
};

export const generateTransform = (
  transformConfig: ShaderTransformationSchema[],
  effectConfig: ShaderEffectConfig,
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean
): {
  transformation: string;
  transformationFunctions: ShaderFunction[];
  mainFunctionInstantiations: string[];
  advancedShaderVariables: AdvancedShaderVariableMap;
} => {
  const { subEffects, guid: effectId } = effectConfig;
  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = generateShaderTransformData(
        subEffect,
        parameterMap,
        true
      );
      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const transformationConfigs = setupShaderTransformationConfigs(
    transformConfig,
    effectConfig,
    isSubEffect,
    subEffectDataArray,
    parameterMap
  );

  const effectFunctions = transformFunction(
    transformationConfigs,
    effectConfig
  );

  const shaderVariableTypes = transformationConfigs.flatMap(
    ({ assignedVariableId }) => {
      return assignedVariableId ?? [];
    }
  );
  const advancedShaderVariables = shaderVariableTypes.reduce(
    (map, assignedVariableId) => {
      const transformCode =
        ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId];
      if (transformCode) {
        map.set(assignedVariableId, transformCode);
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
          isSubEffect)
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

  const transformation = [...mainFunctionInstantiations].join("\n");

  const transformationFunctions = [
    ...effectFunctions.filter(({ dontDeclare }) => {
      return !dontDeclare;
    }),
    ...subEffectDataArray.flatMap(({ requiredFunctions }) => requiredFunctions),
  ];
  return {
    transformation,
    mainFunctionInstantiations,
    transformationFunctions,
    advancedShaderVariables,
  };
};
