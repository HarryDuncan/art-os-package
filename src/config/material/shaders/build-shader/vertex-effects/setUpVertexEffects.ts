import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  VERTEX_EFFECT_CONFIG_MAP,
  VERTEX_POINT_NAME,
} from "./vertexEffects.consts";
import { VertexEffectProps } from "./vertexEffects.types";
import { setupEffectParameters } from "../helpers/generate-transform/formatShaderEffectParameters";
import { DEFAULT_VERTEX_PARAMETERS } from "../helpers/generate-transform/consts";
import { prepareFunctionConfigs } from "../helpers/generate-transform/prepareFunctionConfigs";
import { defineEffectFunctions } from "../helpers/generate-transform/defineEffectFunctions";
import {
  ShaderFunction,
  ShaderTransformationConfig,
  VertexEffectConfig,
} from "../buildShader.types";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { FUNCTION_TYPES } from "../constants";
import { generateConstantDeclarations } from "../helpers/generate-transform/constantDeclarations";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const { transformations, requiredFunctions, constantDeclarations } =
    getVertexTransformations(vertexEffects);
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`;
  return {
    transformations,
    requiredFunctions,
    viewMatrix,
    constantDeclarations,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const allConstantDeclarations: string[][] = [];
  vertexEffects.forEach((effect) => {
    const vertexEffectData = transformSetup(effect, false);
    if (vertexEffectData !== null) {
      const { transformation, requiredFunctions, constantDeclarations } =
        vertexEffectData ?? {};
      unmergedTransformations.push(transformation);
      allRequiredFunctions.push(requiredFunctions);
      allConstantDeclarations.push(constantDeclarations);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const transformations = unmergedTransformations.join("");
  const constantDeclarations = allConstantDeclarations.flat().join("");
  return {
    transformations,
    requiredFunctions: mergedRequiredFunction,
    constantDeclarations,
  };
};

const getEffectTransformationConfigs = (vertexEffect: VertexEffectProps) => {
  const { effectType } = vertexEffect;
  const effectConfig = VERTEX_EFFECT_CONFIG_MAP[effectType];
  if (!effectConfig || !effectConfig.transformationConfig) {
    console.warn(
      `no vertex transformations configured for ${String(effectType)}`
    );
    return null;
  }
  return effectConfig;
};
export const transformSetup = (
  effectProps: VertexEffectProps,
  isSubEffect: boolean
) => {
  const effectConfig = getEffectTransformationConfigs(effectProps);
  if (!effectConfig) {
    return null;
  }
  const { transformationFunctions, transformation, constantDeclarations } =
    generateVertexShaderTransforms(
      effectConfig.transformationConfig as ShaderTransformationConfig[],
      effectProps,
      isSubEffect
    );
  return {
    transformation,
    requiredFunctions: [...effectConfig.functions, ...transformationFunctions],
    constantDeclarations,
  };
};

export const generateVertexShaderTransforms = (
  transformConfig: ShaderTransformationConfig[],
  effectProps: VertexEffectProps,
  isSubEffect: boolean
): {
  transformation: string;
  transformationFunctions: ShaderFunction[];
  constantDeclarations: string[];
} => {
  const { id: effectGuid, subEffects } = effectProps;

  const { shaderParameterMap, effectParameters } = setupEffectParameters(
    effectProps,
    DEFAULT_VERTEX_PARAMETERS
  );

  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = transformSetup(subEffect, true);
      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const transformFunctionConfigs = prepareFunctionConfigs(
    transformConfig,
    shaderParameterMap,
    effectGuid,
    isSubEffect,
    subEffectDataArray
  );

  const effectFunctions = defineEffectFunctions(
    transformFunctionConfigs,
    shaderParameterMap,
    effectParameters
  );

  const constantDeclarations = generateConstantDeclarations(shaderParameterMap);

  const mainFunctionInstantiations = effectFunctions
    .sort((a, b) =>
      a.dontDeclare === b.dontDeclare ? 0 : a.dontDeclare ? -1 : 1
    )
    .flatMap(
      ({
        functionParameters,
        assignedVariableId,
        functionName,
        functionType,
        dontDeclare,
        returnValue,
      }) => {
        if (
          !assignedVariableId ||
          FUNCTION_TYPES.VERTEX_SUB_EFFECT === functionType
        ) {
          return [];
        }
        return setUpFunctionInstantiation(
          assignedVariableId,
          functionName,
          functionParameters,
          returnValue,
          dontDeclare
        );
      }
    );

  const transformation = [...mainFunctionInstantiations].join("\n");

  const transformationFunctions = [
    ...effectFunctions.filter(({ dontDeclare }) => {
      return !dontDeclare;
    }),
    ...subEffectDataArray.flatMap(({ requiredFunctions }) => requiredFunctions),
  ];
  return {
    transformation,
    transformationFunctions,
    constantDeclarations,
  };
};
