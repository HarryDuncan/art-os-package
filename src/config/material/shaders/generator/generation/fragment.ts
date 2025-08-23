import { OperatorConfig, SHADER_VARIABLE_TYPES } from "../../schema";
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

  console.log("assignedVariableIds", assignedVariableIds);
  if (assignedVariableIds.includes(SHADER_VARIABLE_TYPES.LIGHT)) {
    unmergedTransformations.push(
      `${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * vec4(light, 1.0);`
    );
  }

  const [regularEffects, postEffects] = unmergedTransformations.reduce(
    (acc, transformation) => {
      if (transformation.includes(SHADER_VARIABLE_TYPES.POST_EFFECT)) {
        acc[1].push(transformation);
      } else {
        acc[0].push(transformation);
      }
      return acc;
    },
    [[], []] as [string[], string[]]
  );

  const postEffectAssignment =
    postEffects.length > 0
      ? `${FRAG_COLOR_NAME} = vec4(post_effect.rgb, 1.0);`
      : "";

  const advancedShaderVariablesInstantiation = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.instantiation);

  const advancedShaderVariablesAssignment = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.assignment);

  const transformations = [
    ...advancedShaderVariablesInstantiation,
    ...regularEffects,
    ...advancedShaderVariablesAssignment,
    ...postEffects,
    postEffectAssignment,
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
    console.log("fragmentEffectData", fragmentEffectData);
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
