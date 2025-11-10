import { OperatorConfig } from "../../schema";
import { VERTEX_POINT_NAME } from "../consts";
import { ShaderParameterMap, TransformDefinition } from "../types";
import { configureTransform } from "./transforms/config-setup/configureTransform";
import { applyEffectWrapper } from "./transforms/operators/applyOperator";

export const generateVertexEffect = (
  vertexEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const { transformations, transformDefinitions } = getVertexTransformations(
    vertexEffectFunctions,
    parameterMap
  );
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;
  return {
    transformations,
    transformDefinitions,
    viewMatrix,
  };
};

const getVertexTransformations = (
  vertexEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const unmergedTransformations: string[] = [];
  const allTransformDefinitions: TransformDefinition[] = [];
  vertexEffectFunctions.forEach((operator) => {
    const { effects } = operator;
    const configuredTransforms =
      effects?.map((effect) => {
        return configureTransform(effect, parameterMap);
      }) || [];
    const transformData = applyEffectWrapper(
      operator,
      configuredTransforms,
      parameterMap
    );
    if (transformData) {
      unmergedTransformations.push(...transformData.transformAssignments);
      allTransformDefinitions.push(...transformData.transformDefinitions);
    }
  });

  const transformations = unmergedTransformations.join("");
  return {
    transformations,
    transformDefinitions: allTransformDefinitions,
  };
};
