import {
  ShaderEffectConfig,
  ShaderTransformationSchema,
} from "../../../schema";
import { ADVANCED_SHADER_VARIABLE_EFFECT_CODE } from "../../consts";
import {
  AdvancedShaderVariableMap,
  ShaderFunction,
  ShaderParameterMap,
  TransformData,
} from "../../types";
import { functionInstantiation } from "../helpers/functionInstantiation";
import { setupShaderTransformationConfigs } from "./formatting/transformConfig";
import { transformFunction } from "./formatting/transformFunction";

export const generateShaderTransformData = (
  effect: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { effectSchemas } = effect;
  if (effectSchemas) {
    const { transformationFunctions, transformation, advancedShaderVariables } =
      generateTransform(effectSchemas, effect, parameterMap);

    return {
      transformation,
      requiredFunctions: [
        ...(transformationFunctions || []),
        ...transformationFunctions,
      ],
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

  const transformationConfigs = setupShaderTransformationConfigs(
    transformConfig,
    effectConfig,
    parameterMap
  );

  console.log("transformationConfigs", transformationConfigs);
  const effectFunctions = transformFunction(
    transformationConfigs,
    effectConfig
  );
  console.log("effectFunctions", effectFunctions);

  // todo - handle output config
  const shaderVariableTypes: string[] = [];

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
    .flatMap(({ inputMap, functionName, outputConfig, isRoot }) => {
      if (!isRoot) {
        return [];
      }
      return functionInstantiation(
        outputConfig,
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
