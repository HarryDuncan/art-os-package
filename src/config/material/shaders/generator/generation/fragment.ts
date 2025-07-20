import { OperatorConfig } from "../../schema";
import { FRAG_COLOR_NAME } from "../consts";
import {
  AdvancedShaderVariableMap,
  ShaderFunction,
  ShaderParameterMap,
} from "../types";
import { transformSetup } from "./transforms/transformWithOperator";

export const generateFragmentEffect = (
  fragmentEffectFunctions: OperatorConfig[],
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
  fragmentEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allRequiredFunctions: ShaderFunction[] = [];
  const unmergedTransformations: string[] = [];
  const assignedVariableIds: string[] = [];
  const allAdvancedShaderVariables: AdvancedShaderVariableMap = new Map();
  fragmentEffectFunctions.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, parameterMap);
    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(...fragmentEffectData.requiredFunctions);
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

  return {
    unmergedTransformations,
    requiredFunctions: allRequiredFunctions,
    assignedVariableIds: Array.from(new Set(assignedVariableIds)),
    advancedShaderVariables: allAdvancedShaderVariables,
  };
};
