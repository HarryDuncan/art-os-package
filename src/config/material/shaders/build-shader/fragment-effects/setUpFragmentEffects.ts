import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  AdvancedShaderVariable,
  AdvancedShaderVariableMap,
  FragmentEffectConfig,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../buildShader.types";
import {
  FRAG_COLOR_NAME,
  FRAGMENT_EFFECT_CONFIG_MAP,
  FUNCTION_TYPES,
} from "../../../../../consts";
import { FragmentEffectProps } from "./fragmentShader.types";
import {
  DEFAULT_FRAGMENT_PARAMETERS,
  ADVANCED_SHADER_VARIABLE_EFFECT_CODE,
} from "../helpers/generate-transform/consts";
import { setupEffectParameters } from "../helpers/generate-transform/formatShaderEffectParameters";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { prepareFunctionConfigs } from "../helpers/generate-transform/prepareFunctionConfigs";
import { defineEffectFunctions } from "../helpers/generate-transform/defineEffectFunctions";
import { generateConstantDeclarations } from "../helpers/generate-transform/constantDeclarations";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[]
) => {
  const {
    unmergedTransformations,
    requiredFunctions,
    assignedVariableIds,
    constantDeclarations,
    advancedShaderVariables,
  } = getFragmentColors(fragmentEffects);

  if (assignedVariableIds.includes("LIGHT")) {
    unmergedTransformations.push(
      `${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * vec4(light, 1.0);`
    );
  }
  const advancedShaderVariablesInstantiation = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.instantiation);

  const advancedShaderVariablesAssignment = Array.from(
    advancedShaderVariables.values()
  ).map((variable) => variable.assignment);

  const transformations = [
    ...advancedShaderVariablesInstantiation,
    ...unmergedTransformations,
    ...advancedShaderVariablesAssignment,
  ].join("\n");
  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    transformations,
    requiredFunctions,
    assignedVariableIds,
    constantDeclarations,
  };
};

export const getFragmentColors = (fragmentEffects: FragmentEffectConfig[]) => {
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedTransformations: string[] = [];
  const assignedVariableIds: string[] = [];
  const allConstantDeclarations: string[][] = [];
  const allAdvancedShaderVariables: AdvancedShaderVariableMap = new Map();
  fragmentEffects.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, false);
    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
      assignedVariableIds.push(fragmentEffectData.assignedVariableId);
      allConstantDeclarations.push(fragmentEffectData.constantDeclarations);
      if (fragmentEffectData.advancedShaderVariables) {
        Array.from(
          fragmentEffectData.advancedShaderVariables.entries()
        ).forEach(([key, variable]) => {
          allAdvancedShaderVariables.set(key, variable);
        });
      }
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);
  const constantDeclarations = allConstantDeclarations.flat().join("");
  return {
    unmergedTransformations,
    requiredFunctions: mergedRequiredFunction,
    assignedVariableIds: Array.from(new Set(assignedVariableIds)),
    constantDeclarations,
    advancedShaderVariables: allAdvancedShaderVariables,
  };
};

export const transformSetup = (
  effectProps: FragmentEffectProps,
  isSubEffect: boolean
) => {
  const { effectType } = effectProps;
  const effectConfig = FRAGMENT_EFFECT_CONFIG_MAP[effectType];
  if (effectConfig) {
    const {
      transformationFunctions,
      transformation,
      constantDeclarations,
      advancedShaderVariables,
    } = generateFragmentShaderTransformation(
      effectConfig.transformationConfig,
      effectProps,
      isSubEffect
    );
    // @ts-expect-error - this is a valid type
    const assignedVariableId = effectConfig?.assignedVariableId;

    return {
      transformation,
      requiredFunctions: transformationFunctions,
      assignedVariableId,
      constantDeclarations,
      advancedShaderVariables,
    };
  } else {
    console.warn(
      `no fragment transformations configured for ${String(effectType)}`
    );
    return null;
  }
};

export const generateFragmentShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: FragmentEffectProps,
  isSubEffect: boolean
): {
  transformation: string;
  transformationFunctions: ShaderFunction[];
  constantDeclarations: string[];
  advancedShaderVariables: AdvancedShaderVariableMap;
} => {
  const { subEffects } = effectProps;
  const { shaderParameterMap, effectParameters } = setupEffectParameters(
    effectProps,
    DEFAULT_FRAGMENT_PARAMETERS
  );

  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = transformSetup(subEffect, true);
      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderParameterMap,
    isSubEffect,
    subEffectDataArray
  );

  const shaderVariableTypes = formattedFunctionConfigs.flatMap(
    ({ assignedVariableId }) => {
      return assignedVariableId ?? [];
    }
  );

  const effectFunctions = defineEffectFunctions(
    formattedFunctionConfigs,
    shaderParameterMap,
    effectParameters
  );

  const constantDeclarations = generateConstantDeclarations(shaderParameterMap);

  const advancedShaderVariables = shaderVariableTypes.reduce(
    (map, assignedVariableId) => {
      const transformCode =
        ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId];
      if (transformCode) {
        map.set(assignedVariableId, transformCode);
      }
      return map;
    },
    new Map() as AdvancedShaderVariableMap
  );

  const mainFunctionInstantiations = effectFunctions.flatMap(
    ({
      functionParameters,
      assignedVariableId,
      functionName,
      functionType,
      returnValue,
      dontDeclare,
    }) => {
      if (
        !assignedVariableId ||
        FUNCTION_TYPES.FRAGMENT_SUB_EFFECT === functionType ||
        (ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId] &&
          isSubEffect)
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
    advancedShaderVariables,
  };
};
