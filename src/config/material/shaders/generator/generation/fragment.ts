import {
  OperatorConfig,
  SHADER_TYPES,
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../schema";
import { ShaderParameterMap, TransformDefinition } from "../types";
import { configureTransform } from "./transforms/config-setup/configureTransform";
import { applyEffectWrapper } from "./operators/applyOperator";

export const generateFragmentEffect = (
  operatorConfigs: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const fragmentOperatorConfigs = operatorConfigs.filter(
    (config) => config.type === SHADER_TYPES.FRAGMENT
  );
  const { unmergedTransformAssignments, transformDefinitions, outputConfigs } =
    getFragmentColors(fragmentOperatorConfigs, parameterMap);

  if (
    outputConfigs.some((config) => config.key === SHADER_VARIABLE_TYPES.LIGHT)
  ) {
    unmergedTransformAssignments.push(
      `${SHADER_VARIABLE_TYPES.FRAGMENT_COLOR} = ${SHADER_VARIABLE_TYPES.FRAGMENT_COLOR} * vec4(light, 1.0);`
    );
  }

  const [regularEffects, postEffects] = unmergedTransformAssignments.reduce(
    (acc, transformAssignment) => {
      if (transformAssignment.includes(SHADER_VARIABLE_TYPES.POST_EFFECT)) {
        acc[1].push(transformAssignment);
      } else {
        acc[0].push(transformAssignment);
      }
      return acc;
    },
    [[], []] as [string[], string[]]
  );

  const postEffectAssignment =
    postEffects.length > 0
      ? `${SHADER_VARIABLE_TYPES.FRAGMENT_COLOR} = vec4(post_effect.rgb, 1.0);`
      : "";

  const { discardColorInstantiation, discardColorAssignment } = getDiscardColor(
    unmergedTransformAssignments
  );

  const transformations = [
    discardColorInstantiation,
    ...regularEffects,
    discardColorAssignment,
    ...postEffects,
    postEffectAssignment,
  ].join("\n");
  const fragColor = `gl_FragColor = ${SHADER_VARIABLE_TYPES.FRAGMENT_COLOR};`;
  return {
    fragColor,
    transformations,
    transformDefinitions,
  };
};

export const getFragmentColors = (
  fragmentOperations: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allTransformDefinitions: TransformDefinition[] = [];
  const unmergedTransformAssignments: string[] = [];
  const outputConfigs: ShaderTransformationOutputConfig[] = [];

  fragmentOperations.forEach((operation) => {
    const { effects } = operation;
    const effectTransforms =
      effects?.map((effect) => {
        return configureTransform(effect, parameterMap);
      }) || [];
    const transformData = applyEffectWrapper(
      operation,
      effectTransforms,
      parameterMap
    );
    if (transformData) {
      unmergedTransformAssignments.push(...transformData.transformAssignments);
      allTransformDefinitions.push(...transformData.transformDefinitions);
      outputConfigs.push(...transformData.outputConfigs);
    }
  });

  return {
    unmergedTransformAssignments,
    transformDefinitions: allTransformDefinitions,
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
