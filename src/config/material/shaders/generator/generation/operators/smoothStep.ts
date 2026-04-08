import { OperatorConfig } from "../../../schema";
import { findKeyMatch } from "../../../utils";
import { ConfiguredTransform, ShaderParameterMap } from "../../types";

const floorToFixed = (value: number, decimals: number): string =>
  (Math.floor(value * 10 ** decimals) / 10 ** decimals).toFixed(decimals);

export const smoothStep = (
  effectTransforms: ConfiguredTransform[],
  operatorTransform: OperatorConfig,
  parameterMap: ShaderParameterMap,
): ConfiguredTransform => {
  console.log("effectTransforms:", effectTransforms);
  console.log("operatorTransform:", operatorTransform);
  console.log("parameterMap:", parameterMap);
  const { inputMapping, outputMapping, outputMapSchema, value, guid } =
    operatorTransform;
  const inputParameterKeys = Object.keys(inputMapping).map((key) =>
    findKeyMatch(key, parameterMap),
  );

  const outputEffects = Object.keys(outputMapSchema).reduce(
    (acc, key) => {
      const outputEffectIds = Object.values(outputMapping).flatMap((mapping) =>
        mapping.sourceKey === key ? mapping.itemId : [],
      );
      const rangeMin = acc.length > 0 ? acc[acc.length - 1].rangeMax : 0.0;
      const rangeMax = rangeMin + value[key as keyof typeof value];
      acc.push({
        outputEffectIds,
        rangeMin,
        rangeMax,
      });
      return acc;
    },
    [] as { outputEffectIds: string[]; rangeMin: number; rangeMax: number }[],
  );

  const allTransformDefinitions = [
    ...effectTransforms.flatMap((transform) => transform.transformDefinitions),
  ];

  const inputParam = inputParameterKeys[0];
  const transformAssignment: string[] = [];

  outputEffects.forEach(({ rangeMin, rangeMax }, index) => {
    const center = (rangeMin + rangeMax) / 2;
    const edge = rangeMax - rangeMin;
    transformAssignment.push(
      `float w_${index}_${guid} = 1.0 - smoothstep(0.0, ${floorToFixed(edge, 6)}, abs(${inputParam} - ${floorToFixed(center, 6)}));`,
    );
  });

  const weightNames = outputEffects.map((_, index) => `w_${index}_${guid}`);
  transformAssignment.push(
    `float totalWeight_${guid} = ${weightNames.join(" + ")};`,
  );

  const weightedTerms: {
    weight: string;
    assignedVariableName: string;
    transformFunctionCall: string;
  }[] = [];

  outputEffects.forEach(({ outputEffectIds }, index) => {
    const weight = `w_${index}_${guid}`;
    const matchingTransforms = effectTransforms.filter((t) =>
      outputEffectIds.includes(t.guid),
    );
    matchingTransforms.forEach((transform) => {
      weightedTerms.push({
        weight,
        assignedVariableName: transform.assignedVariableName,
        transformFunctionCall: transform.transformFunctionCall,
      });
    });
  });

  const uniqueVariableNames = [
    ...new Set(weightedTerms.map((t) => t.assignedVariableName)),
  ];

  uniqueVariableNames.forEach((variableName) => {
    const terms = weightedTerms.filter(
      (t) => t.assignedVariableName === variableName,
    );
    const weightedSum = terms
      .map((t) => `${t.transformFunctionCall} * ${t.weight}`)
      .join(" + ");
    transformAssignment.push(
      `${variableName} = (${weightedSum}) / totalWeight_${guid};`,
    );
  });

  return {
    guid: operatorTransform.guid,
    assignedVariableName: "",
    transformFunctionCall: "",
    transformAssignments: transformAssignment,
    outputConfigs: [],
    transformDefinitions: allTransformDefinitions,
  };
};
