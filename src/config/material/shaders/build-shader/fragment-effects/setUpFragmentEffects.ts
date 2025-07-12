import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  AdvancedShaderVariableMap,
  EffectFunctionConfig,
  ShaderFunction,
  ShaderParameterMap,
} from "../buildShader.types";
import { FRAG_COLOR_NAME } from "../../../../../consts";
import { EFFECT_FUNCTIONS } from "../effect-functions";
import { splitValueTransform } from "../effect-functions/splitValueTransform";
import { generateShaderTransformData } from "../helpers/generate-transform/generateTransform";

export const setUpFragmentEffects = (
  fragmentEffectFunctions: EffectFunctionConfig[],
  parameterMap: ShaderParameterMap
) => {
  const {
    unmergedTransformations,
    requiredFunctions,
    assignedVariableIds,
    advancedShaderVariables,
  } = getFragmentColors(fragmentEffectFunctions, parameterMap);

  if (assignedVariableIds.includes("LIGHT")) {
    unmergedTransformations.push(
      `${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * vec4(light, 1.0);`
    );
  }
  const advancedShaderVariablesInstantiation = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.instantiation);

  const advancedShaderVariablesAssignment = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.assignment);

  const transformations = [
    ...advancedShaderVariablesInstantiation,
    ...unmergedTransformations,
    ...advancedShaderVariablesAssignment,
  ].join("\n");
  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    transformations,
    requiredFunctions,
    assignedVariableIds,
  };
};

export const getFragmentColors = (
  fragmentEffectFunctions: EffectFunctionConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedTransformations: string[] = [];
  const assignedVariableIds: string[] = [];
  const allAdvancedShaderVariables: AdvancedShaderVariableMap = new Map();
  fragmentEffectFunctions.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, parameterMap);

    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
      assignedVariableIds.push(fragmentEffectData.assignedVariableId ?? "");
      if (fragmentEffectData.advancedShaderVariables) {
        Array.from(
          fragmentEffectData.advancedShaderVariables.entries()
        ).forEach(([key, variable]) => {
          allAdvancedShaderVariables.set(key, variable);
        });
      }
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  return {
    unmergedTransformations,
    requiredFunctions: mergedRequiredFunction,
    assignedVariableIds: Array.from(new Set(assignedVariableIds)),
    advancedShaderVariables: allAdvancedShaderVariables,
  };
};

export const transformSetup = (
  effectProps: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
) => {
  const { functionId, effects } = effectProps;
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

  switch (functionId) {
    case EFFECT_FUNCTIONS.DEFAULT:
      return effectTransformationData[0];
    case EFFECT_FUNCTIONS.SPLIT_VALUE:
      return splitValueTransform(
        effectProps,
        effectTransformationData,
        parameterMap
      );
    default:
      return null;
  }
};
