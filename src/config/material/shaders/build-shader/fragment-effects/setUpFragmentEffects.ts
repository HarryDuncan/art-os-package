import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
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

import { formatShaderEffectParameters } from "../helpers/generate-transform/formatShaderEffectParameters";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { prepareFunctionConfigs } from "../helpers/generate-transform/prepareFunctionConfigs";
import {
  parseRawValueToShader,
  shaderValueTypeInstantiation,
} from "../helpers/safeParseValue";
import { defineEffectFunctions } from "../helpers/generate-transform/defineEffectFunctions";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[]
) => {
  const { unmergedTransformations, requiredFunctions, assignedVariableIds } =
    getFragmentColors(fragmentEffects);

  if (assignedVariableIds.includes("LIGHT")) {
    unmergedTransformations.push(
      `${FRAG_COLOR_NAME} = ${FRAG_COLOR_NAME} * vec4(light, 1.0);`
    );
  }
  const transformations = unmergedTransformations.join("");
  const fragColor = `gl_FragColor = ${FRAG_COLOR_NAME};`;
  return {
    fragColor,
    transformations,
    requiredFunctions,
    assignedVariableIds,
  };
};

export const getFragmentColors = (fragmentEffects: FragmentEffectConfig[]) => {
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedTransformations: string[] = [];
  const assignedVariableIds: string[] = [];
  fragmentEffects.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, false);
    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
      assignedVariableIds.push(fragmentEffectData.assignedVariableId);
    }
  });

  const mergedRequiredFunction = mergeShaderFunctions(allRequiredFunctions);

  return {
    unmergedTransformations,
    requiredFunctions: mergedRequiredFunction,
    assignedVariableIds: Array.from(new Set(assignedVariableIds)),
  };
};

export const transformSetup = (
  effectProps: FragmentEffectProps,
  isSubEffect: boolean
) => {
  const { effectType } = effectProps;
  const effectConfig = FRAGMENT_EFFECT_CONFIG_MAP[effectType];
  if (effectConfig) {
    const { transformationFunctions, transformation } =
      generateFragmentShaderTransformation(
        effectConfig.transformationConfig,
        effectProps,
        isSubEffect
      );
    // @ts-expect-error
    const assignedVariableId = effectConfig?.assignedVariableId;

    return {
      transformation,
      requiredFunctions: transformationFunctions,
      assignedVariableId,
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
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters, subEffects } = effectProps;

  // subEffects
  const subEffectParameterIds =
    subEffects?.flatMap(({ effectParameters }) => effectParameters) ?? [];

  const allEffectParameters = [...effectParameters, ...subEffectParameterIds];

  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = transformSetup(subEffect, true);

      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const shaderEffectParameters = formatShaderEffectParameters(
    DEFAULT_FRAGMENT_PARAMETERS,
    allEffectParameters,
    id
  );

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderEffectParameters,
    id,
    [],
    isSubEffect,
    subEffectDataArray
  );

  const shaderVariableTypes = formattedFunctionConfigs.flatMap(
    ({ assignedVariableId }) => {
      return assignedVariableId ?? [];
    }
  );
  const advancedShaderVariables = shaderVariableTypes.flatMap(
    (assignedVariableId) => {
      const effectCode =
        ADVANCED_SHADER_VARIABLE_EFFECT_CODE[assignedVariableId];
      if (effectCode) {
        return effectCode;
      }
      return [];
    }
  );

  const effectFunctions = defineEffectFunctions(
    formattedFunctionConfigs,
    shaderEffectParameters,
    effectParameters
  );

  // // if parameters are just consts then add them
  const constantDeclarations = allEffectParameters
    .filter(
      (p) => !p.isUniform && !p.isAttribute && !p.isVarying && !isSubEffect
    )
    .map((p) => {
      return `${shaderValueTypeInstantiation(p.valueType)} ${
        p.id
      } = ${parseRawValueToShader(p.valueType, p.value)};`;
    });

  const advancedShaderVariablesInstantiation = advancedShaderVariables.flatMap(
    ({ instantiation }) => {
      return instantiation ?? [];
    }
  );

  const advancedShaderVariablesAssignment = advancedShaderVariables.flatMap(
    ({ assignment }) => {
      return assignment ?? [];
    }
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
        FUNCTION_TYPES.FRAGMENT_SUB_EFFECT === functionType
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

  const transformation = [
    ...constantDeclarations,
    ...advancedShaderVariablesInstantiation,
    ...mainFunctionInstantiations,
    ...advancedShaderVariablesAssignment,
  ].join("\n");

  const transformationFunctions = [
    ...effectFunctions.filter(({ dontDeclare }) => {
      return !dontDeclare;
    }),
    ...subEffectDataArray.flatMap(({ requiredFunctions }) => requiredFunctions),
  ];

  return { transformation, transformationFunctions };
};
