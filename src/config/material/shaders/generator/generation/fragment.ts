import {
  OperatorConfig,
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../schema";
import { FRAG_COLOR_NAME } from "../consts";
import { ShaderFunction, ShaderParameterMap } from "../types";
import { transformSetup } from "./transforms/transformWithOperator";

export const generateFragmentEffect = (
  fragmentEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const { unmergedTransformations, requiredFunctions, outputConfigs } =
    getFragmentColors(fragmentEffectFunctions, parameterMap);

  if (
    outputConfigs.some((config) => config.key === SHADER_VARIABLE_TYPES.LIGHT)
  ) {
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

  const { discardColorInstantiation, discardColorAssignment } = getDiscardColor(
    unmergedTransformations
  );

  // const advancedShaderVariablesInstantiation = Array.from(
  //   advancedShaderVariables.entries()
  // ).flatMap(([key, variable]) =>
  //   key !== SHADER_VARIABLE_TYPES.DISCARD_COLOR
  //     ? variable.map((v) => v.instantiation)
  //     : []
  // );

  // const advancedShaderVariablesAssignment = Array.from(
  //   advancedShaderVariables.entries()
  // ).flatMap(([key, variable]) =>
  //   key !== SHADER_VARIABLE_TYPES.DISCARD_COLOR
  //     ? variable.map((v) => v.assignment)
  //     : []
  // );

  const transformations = [
    discardColorInstantiation,
    //  ...advancedShaderVariablesInstantiation,
    ...regularEffects,
    //  ...advancedShaderVariablesAssignment,

    discardColorAssignment,
    ...postEffects,
    postEffectAssignment,
  ].join("\n");
  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    transformations,
    requiredFunctions,
  };
};

export const getFragmentColors = (
  fragmentOperations: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allRequiredFunctions: ShaderFunction[] = [];
  const unmergedTransformations: string[] = [];
  const outputConfigs: ShaderTransformationOutputConfig[] = [];

  fragmentOperations.forEach((operation) => {
    const fragmentEffectData = transformSetup(operation, parameterMap);
    if (fragmentEffectData) {
      unmergedTransformations.push(...fragmentEffectData.transformation);
      allRequiredFunctions.push(...fragmentEffectData.requiredFunctions);
      outputConfigs.push(...fragmentEffectData.outputConfigs);
    }
  });

  return {
    unmergedTransformations,
    requiredFunctions: allRequiredFunctions,
    outputConfigs,
  };
};

const getDiscardColor = (unmergedTransformations: string[]) => {
  const hasDiscardColor = unmergedTransformations.some((transformation) =>
    transformation.includes("discardColor")
  );
  if (hasDiscardColor) {
    return {
      discardColorInstantiation: "float discardColor = 1.0;",
      discardColorAssignment: `if(discardColor == 0.0){discard;}`,
    };
  }
  return {
    discardColorInstantiation: "",
    discardColorAssignment: "",
  };
};
