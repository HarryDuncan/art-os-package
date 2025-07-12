import {
  AdvancedShaderVariableMap,
  ShaderEffectConfig,
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationSchema,
  TransformData,
} from "../../buildShader.types";
import { FUNCTION_TYPES, SHADER_TYPES } from "../../constants";
import { FRAGMENT_EFFECT_CONFIG_MAP } from "../../fragment-effects/fragmentEffects.consts";
import { VERTEX_EFFECT_CONFIG_MAP } from "../../vertex-effects/vertexEffects.consts";
import { ADVANCED_SHADER_VARIABLE_EFFECT_CODE } from "./consts";
import { setUpFunctionInstantiation } from "./functions";
import { setupShaderTransformationConfig } from "./setupShaderTransformConfig";
import { transformationToFunction } from "./transformationToFunction";

export const getTransformationData = (
  effectType: string,
  shaderType: string
) => {
  if (shaderType === SHADER_TYPES.VERTEX) {
    return VERTEX_EFFECT_CONFIG_MAP[effectType];
  }
  return FRAGMENT_EFFECT_CONFIG_MAP[effectType];
};

export const generateShaderTransformData = (
  effect: ShaderEffectConfig,
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean = false
): TransformData | null => {
  const { effectType } = effect;
  const transformationData = getTransformationData(
    effectType,
    effect.shaderType
  );
  if (transformationData) {
    // @ts-ignore
    const { transformationConfig, assignedVariableId, functions } =
      transformationData;
    const { transformationFunctions, transformation, advancedShaderVariables } =
      generateTransform(
        transformationConfig as ShaderTransformationSchema[],
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
  const { subEffects, id: effectId } = effectConfig;
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

  const transformationConfigs = setupShaderTransformationConfig(
    transformConfig,
    effectConfig,
    isSubEffect,
    subEffectDataArray,
    parameterMap
  );

  const effectFunctions = transformationToFunction(
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
    .flatMap(
      ({
        inputMap,
        assignedVariableId,
        functionName,
        functionType,
        dontDeclare,
        returnValue,
      }) => {
        if (
          !assignedVariableId ||
          FUNCTION_TYPES.VERTEX_SUB_EFFECT === functionType ||
          FUNCTION_TYPES.FRAGMENT_SUB_EFFECT === functionType ||
          (ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId] &&
            isSubEffect)
        ) {
          return [];
        }
        return setUpFunctionInstantiation(
          assignedVariableId,
          functionName,
          inputMap,
          returnValue,
          effectId,
          dontDeclare
        );
      }
    );

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
