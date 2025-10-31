import {
  OperatorConfig,
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../schema";
import { FRAG_COLOR_NAME } from "../consts";
import { ShaderFunction, ShaderParameterMap } from "../types";
import { shaderSafeFloat } from "./helpers/shaderValues";
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
  } = getDiscardColor(discardEffects);

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
  };
};

export const getFragmentColors = (
  fragmentEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allRequiredFunctions: ShaderFunction[] = [];
  const unmergedTransformations: string[] = [];
  const outputConfigs: ShaderTransformationOutputConfig[] = [];

  fragmentEffectFunctions.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, parameterMap);
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

const getDiscardColor = (discardEffects: string[]) => {
  if (discardEffects.length === 0) {
    return {
      discardColorInstantiation: "",
      discardColorAssignment: "",
      discardColorTransformations: [],
    };
  }
  const discardColorInstantiation = "float discardColor = 0.0;";
  const discardColorAssignment = `if(discardColor < ${shaderSafeFloat(
    discardEffects.length
  )}){discard;}`;

  return {
    discardColorInstantiation: discardColorInstantiation ?? "",
    discardColorTransformations: discardEffects.join("\n") ?? "",
    discardColorAssignment: discardColorAssignment,
  };
};
