import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  VERTEX_EFFECT_CONFIG_MAP,
  VERTEX_POINT_NAME,
} from "./vertexEffects.consts";
import {
  ShaderFunction,
  ShaderTransformationConfig,
  VertexEffectConfig,
} from "../../../../../types/materials/index";
import { VertexEffectProps } from "./vertexEffects.types";
import { formatShaderEffectParameters } from "../helpers/generate-transform/formatShaderEffectParameters";
import { DEFAULT_VERTEX_PARAMETERS } from "../helpers/generate-transform/consts";
import { prepareFunctionConfigs } from "../helpers/generate-transform/prepareFunctionConfigs";
import { formatEffectFunctions } from "../helpers/generate-transform/formatEffectFunctions";
import { shaderValueTypeInstantiation } from "../helpers/safeParseValue";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { FUNCTION_TYPES } from "../constants";

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
    const vertexEffectData = transformSetup(effect, false);
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
  const { transformationFunctions, transformation } =
    generateVertexShaderTransformation(
      effectConfig.transformationConfig,
      effectProps,
      isSubEffect
    );
  return {
    transformation,
    requiredFunctions: [...effectConfig.functions, ...transformationFunctions],
  };
};

export const generateVertexShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: VertexEffectProps,
  isSubEffect: boolean
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters } = effectProps;

  // subEffects
  // const subEffectParameterIds =
  //   subEffects?.flatMap(({ effectParameters }) => effectParameters) ?? [];

  // const allEffectParameters = [...effectParameters, ...subEffectParameterIds];

  // const subEffectDataArray =
  //   subEffects?.flatMap((subEffect) => {
  //     const subEffectData = transformSetup(subEffect, true);
  //     console.log("subEffectData", subEffectData);
  //     if (subEffectData) {
  //       return subEffectData;
  //     }
  //     return [];
  //   }) ?? [];

  const shaderParameters = formatShaderEffectParameters(
    DEFAULT_VERTEX_PARAMETERS,
    effectParameters,
    id
  );

  const parametersWithFunctionConfigs = effectParameters.filter((parameter) => {
    const { functionConfig } = parameter;
    if (functionConfig) return true;
    return false;
  });
  //  console.log("subEffectDataArray", subEffectDataArray);
  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderParameters,
    id,
    parametersWithFunctionConfigs,
    isSubEffect,
    []
  );

  const effectFunctions = formatEffectFunctions(
    formattedFunctionConfigs,
    shaderParameters,
    effectParameters
  );

  // // if parameters are just consts then add them
  const constantDeclarations = effectParameters
    .filter((p) => !p.isUniform && !p.isAttribute && !p.isVarying)
    .map((p) => {
      return `${shaderValueTypeInstantiation(p.valueType)} ${p.id} = ${
        p.value
      };`;
    });

  const mainFunctionInstantiations = effectFunctions.flatMap(
    ({
      functionParameters,
      assignedVariableId,
      functionName,
      functionType,
    }) => {
      if (
        !assignedVariableId ||
        functionType === FUNCTION_TYPES.VERTEX_SUB_EFFECT
      ) {
        return [];
      }
      return setUpFunctionInstantiation(
        assignedVariableId,
        functionName,
        functionParameters
      );
    }
  );

  const transformation = [
    ...constantDeclarations,
    ...mainFunctionInstantiations,
  ].join("\n");

  const transformationFunctions = effectFunctions.filter(({ dontDeclare }) => {
    return !dontDeclare;
  });

  return { transformation, transformationFunctions };
};
