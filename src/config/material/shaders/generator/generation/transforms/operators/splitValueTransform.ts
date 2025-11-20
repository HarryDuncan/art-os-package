import { OperatorConfig } from "../../../../schema";
import { findKeyMatch } from "../../../../utils";
import { ConfiguredTransform, ShaderParameterMap } from "../../../types";

export const splitValueTransform = (
  effectTransforms: ConfiguredTransform[],
  operatorTransform: OperatorConfig,
  parameterMap: ShaderParameterMap
): ConfiguredTransform => {
  const { inputMapping, outputMapping, outputMapSchema, value } =
    operatorTransform;
  const inputParameterKeys = Object.keys(inputMapping).map((key) =>
    findKeyMatch(key, parameterMap)
  );

  const outputEffects = Object.keys(outputMapSchema).reduce((acc, key) => {
    const outputEffectIds = Object.values(outputMapping).flatMap((mapping) =>
      mapping.sourceKey === key ? mapping.itemId : []
    );
    acc.push({ outputEffectIds, value: value[key as keyof typeof value] });
    return acc;
  }, [] as { outputEffectIds: string[]; value: number }[]);

  const allTransformDefinitions = [
    ...effectTransforms.flatMap((transform) => transform.transformDefinitions),
  ];

  const transformAssignment: string[] = [];
  outputEffects.forEach(({ outputEffectIds, value }, index) => {
    const next =
      index + 1 < outputEffects.length ? outputEffects[index + 1] : null;
    const isFirst = index === 0;
    const condition = `if(${inputParameterKeys[0]} ${
      isFirst ? "<" : ">"
    } ${value.toFixed(6)} ${
      next && !isFirst
        ? `&& (${inputParameterKeys[0]} >= ${next.value.toFixed(6)}`
        : ""
    } ) {`;
    transformAssignment.push(condition);
    const outputEffectTransforms = effectTransforms.filter((transform) =>
      outputEffectIds.includes(transform.guid)
    );

    transformAssignment.push(
      ...outputEffectTransforms.flatMap(
        (transform) => transform.transformAssignments
      )
    );
    {
      transformAssignment.push("}");
    }
  });

  return {
    guid: operatorTransform.guid,
    transformAssignments: transformAssignment,
    outputConfigs: [],
    transformDefinitions: allTransformDefinitions,
  };
};
