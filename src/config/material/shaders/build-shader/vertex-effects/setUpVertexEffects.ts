import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import { VERTEX_POINT_NAME } from "./vertexEffects.consts";
import { ShaderFunction, ShaderParameterMap } from "../buildShader.types";
import { EffectFunctionConfig } from "../buildShader.types";
import { generateShaderTransformData } from "../helpers/generate-transform/generateTransform";

export const setUpVertexEffects = (
  vertexEffectFunctions: EffectFunctionConfig[],
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
  vertexEffectFunctions: EffectFunctionConfig[],
  parameterMap: ShaderParameterMap
) => {
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  vertexEffectFunctions.forEach((effect) => {
    const vertexEffectData = transformSetup(effect, parameterMap);
    if (vertexEffectData !== null) {
      const { transformation, requiredFunctions } = vertexEffectData ?? {};
      unmergedTransformations.push(transformation ?? "");
      allRequiredFunctions.push(requiredFunctions ?? []);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const transformations = unmergedTransformations.join("");
  return {
    transformations,
    requiredFunctions: mergedRequiredFunction,
  };
};

export const transformSetup = (
  effectProps: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
) => {
  const { functionId, effects } = effectProps;
  const effectTransformationData = effects.flatMap((effect) => {
    const data = generateShaderTransformData(effect, parameterMap);
    if (data) {
      return {
        id: effect.id,
        ...data,
      };
    }
  });

  switch (functionId) {
    case "DEFAULT_EFFECT_FUNCTION":
      return effectTransformationData[0];
    default:
      return null;
  }
};
