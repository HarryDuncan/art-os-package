import { OperatorConfig } from "../../schema";
import { VERTEX_POINT_NAME } from "../consts";
import { ShaderFunction, ShaderParameterMap } from "../types";
import { transformSetup } from "./transforms/transformWithOperator";

export const generateVertexEffect = (
  vertexEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const { transformations, requiredFunctions } = getVertexTransformations(
    vertexEffectFunctions,
    parameterMap
  );
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;
  return {
    transformations,
    requiredFunctions,
    viewMatrix,
  };
};

const getVertexTransformations = (
  vertexEffectFunctions: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[] = [];
  vertexEffectFunctions.forEach((effect) => {
    const vertexEffectData = transformSetup(effect, parameterMap);
    if (vertexEffectData !== null) {
      const { transformation, requiredFunctions } = vertexEffectData ?? {};
      unmergedTransformations.push(...(transformation ?? []));
      allRequiredFunctions.push(...(requiredFunctions ?? []));
    }
  });

  const transformations = unmergedTransformations.join("");
  return {
    transformations,
    requiredFunctions: allRequiredFunctions,
  };
};
