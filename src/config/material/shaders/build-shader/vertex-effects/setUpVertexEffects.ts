import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  VERTEX_EFFECT_CONFIG_MAP,
  VERTEX_POINT_NAME,
} from "./vertexEffects.consts";
import {
  ShaderFunction,
  VertexEffectConfig,
} from "../../../../../types/materials/index";
import { VertexEffectProps } from "./vertexEffects.types";
import { generateVertexShaderTransformation } from "../helpers/generate-transform/generateTransform";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const { transformations, requiredFunctions } =
    getVertexTransformations(vertexEffects);
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;
  return {
    transformations,
    requiredFunctions,
    viewMatrix,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];

  vertexEffects.forEach((effect) => {
    const vertexEffectData = transformSetup(effect);
    if (vertexEffectData !== null) {
      const { transformation, requiredFunctions } = vertexEffectData ?? {};
      unmergedTransformations.push(transformation);
      allRequiredFunctions.push(requiredFunctions);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const transformations = unmergedTransformations.join("");
  return {
    transformations,
    requiredFunctions: mergedRequiredFunction,
  };
};

export const transformSetup = (effectProps: VertexEffectProps) => {
  const { effectType } = effectProps;

  const effectConfig = VERTEX_EFFECT_CONFIG_MAP[effectType];
  if (!effectConfig || !effectConfig.transformationConfig) {
    console.warn(
      `no vertex transformations configured for ${String(effectType)}`
    );
    return null;
  }

  const { transformationFunctions, transformation } =
    generateVertexShaderTransformation(
      effectConfig.transformationConfig,
      effectProps
    );

  return {
    transformation,
    requiredFunctions: [...effectConfig.functions, ...transformationFunctions],
  };
};
