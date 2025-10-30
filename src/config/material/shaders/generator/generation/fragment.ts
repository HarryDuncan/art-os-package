import { OperatorConfig, SHADER_VARIABLE_TYPES } from "../../schema";
import { FRAG_COLOR_NAME } from "../consts";
import {
  AdvancedShaderVariableMap,
  ShaderFunction,
  ShaderParameterMap,
} from "../types";
import { shaderSafeFloat } from "./helpers/shaderValues";
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

  if (assignedVariableIds.includes(SHADER_VARIABLE_TYPES.LIGHT)) {
    unmergedTransformations.push(
      `${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * vec4(light, 1.0);`
    );
  }

  const [regularEffects, postEffects, discardEffects] =
    unmergedTransformations.reduce(
      (acc, transformation) => {
        if (transformation.includes(SHADER_VARIABLE_TYPES.POST_EFFECT)) {
          acc[1].push(transformation);
        } else if (transformation.includes("discardColor")) {
          acc[2].push(transformation);
        } else {
          acc[0].push(transformation);
        }
        return acc;
      },
      [[], [], []] as [string[], string[], string[]]
    );

  const postEffectAssignment =
    postEffects.length > 0
      ? `${FRAG_COLOR_NAME} = vec4(post_effect.rgb, 1.0);`
      : "";

  const {
    discardColorInstantiation,
    discardColorAssignment,
    discardColorTransformations,
  } = getDiscardColor(discardEffects, advancedShaderVariables);
  const advancedShaderVariablesInstantiation = Array.from(
    advancedShaderVariables.entries()
  ).flatMap(([key, variable]) =>
    key !== SHADER_VARIABLE_TYPES.DISCARD_COLOR
      ? variable.map((v) => v.instantiation)
      : []
  );

  const advancedShaderVariablesAssignment = Array.from(
    advancedShaderVariables.entries()
  ).flatMap(([key, variable]) =>
    key !== SHADER_VARIABLE_TYPES.DISCARD_COLOR
      ? variable.map((v) => v.assignment)
      : []
  );

  const transformations = [
    discardColorInstantiation,
    ...advancedShaderVariablesInstantiation,
    ...regularEffects,
    ...advancedShaderVariablesAssignment,
    discardColorTransformations,
    discardColorAssignment,
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
    if (fragmentEffectData) {
      unmergedTransformations.push(...fragmentEffectData.transformation);
      allRequiredFunctions.push(...fragmentEffectData.requiredFunctions);
      // fragmentEffectData.assignedVariableId ?? ""
      // TODO - update to output config
      // assignedVariableIds.push();
      if (fragmentEffectData.advancedShaderVariables) {
        Array.from(
          fragmentEffectData.advancedShaderVariables.entries()
        ).forEach(([key, variable]) => {
          allAdvancedShaderVariables.set(key, [
            ...(allAdvancedShaderVariables.get(key) || []),
            ...variable,
          ]);
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

const getDiscardColor = (
  discardEffects: string[],
  advancedShaderVariables: AdvancedShaderVariableMap
) => {
  if (discardEffects.length === 0) {
    return {
      discardColorInstantiation: "",
      discardColorAssignment: "",
      discardColorTransformations: [],
    };
  }
  const discardColorInstantiation = advancedShaderVariables
    .get(SHADER_VARIABLE_TYPES.DISCARD_COLOR)
    ?.map((v) => v.instantiation)[0];
  const discardColorAssignment = advancedShaderVariables
    .get(SHADER_VARIABLE_TYPES.DISCARD_COLOR)
    ?.map((v) => v.assignment)[0];

  return {
    discardColorInstantiation: discardColorInstantiation ?? "",
    discardColorTransformations: discardEffects.join("\n") ?? "",
    discardColorAssignment: discardColorAssignment
      ? discardColorAssignment.replace(
          "XXX_DISCARD_FUNCTION_COUNT_XXX",
          shaderSafeFloat(discardEffects.length)
        )
      : "",
  };
};
