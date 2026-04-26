import { OperatorConfig } from "../../../schema";
import { findKeyMatch } from "../../../utils";
import { ConfiguredTransform, ShaderParameterMap } from "../../types";

const floorToFixed = (value: number, decimals: number): string =>
  (Math.floor(value * 10 ** decimals) / 10 ** decimals).toFixed(decimals);

export const splitValueTransform = (
  effectTransforms: ConfiguredTransform[],
  operatorTransform: OperatorConfig,
  parameterMap: ShaderParameterMap,
): ConfiguredTransform => {
  const { inputMapping, outputMapping, outputMapSchema, value } =
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

  const transformAssignment: string[] = [];
  outputEffects.forEach(({ outputEffectIds, rangeMin, rangeMax }) => {
    const isLast =
      rangeMax === outputEffects[outputEffects.length - 1].rangeMax;
    const condition = `if(${inputParameterKeys[0]} >= ${floorToFixed(rangeMin, 6)} ${
      rangeMax &&
      `&& (${inputParameterKeys[0]} ${isLast ? "<=" : "<"} ${floorToFixed(rangeMax, 6)})`
    } ) {`;
    transformAssignment.push(condition);
    const outputEffectTransforms = effectTransforms.filter((transform) =>
      outputEffectIds.includes(transform.guid),
    );

    transformAssignment.push(
      ...outputEffectTransforms.flatMap(
        (transform) => transform.transformAssignments,
      ),
    );
    {
      transformAssignment.push("}");
    }
  });

  return {
    assignedVariableName: "",
    transformFunctionCall: "",
    guid: operatorTransform.guid,
    transformAssignments: transformAssignment,
    outputConfigs: [],
    transformDefinitions: allTransformDefinitions,
  };
};
