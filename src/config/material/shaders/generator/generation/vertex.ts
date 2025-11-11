import {
  OperatorConfig,
  SHADER_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../schema";
import { ShaderParameterMap, TransformDefinition } from "../types";
import { configureTransform } from "./transforms/config-setup/configureTransform";
import { applyEffectWrapper } from "./transforms/operators/applyOperator";

export const generateVertexEffect = (
  operatorConfigs: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const vertexOperatorConfigs = operatorConfigs.filter(
    (config) => config.type === SHADER_TYPES.VERTEX
  );
  const { transformations, transformDefinitions } = getVertexTransformations(
    vertexOperatorConfigs,
    parameterMap
  );
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${SHADER_VARIABLE_TYPES.VERTEX_POINT}.xyz, 1.0);`;

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
