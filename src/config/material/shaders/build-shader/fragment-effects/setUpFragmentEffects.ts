import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  AdvancedShaderVariableMap,
  EffectFunctionConfig,
  FragmentEffectConfig,
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationSchema,
  TransformData,
} from "../buildShader.types";
import {
  FRAG_COLOR_NAME,
  FRAGMENT_EFFECT_CONFIG_MAP,
  FUNCTION_TYPES,
} from "../../../../../consts";
import { FragmentEffectProps } from "./fragmentShader.types";
import { ADVANCED_SHADER_VARIABLE_EFFECT_CODE } from "../helpers/generate-transform/consts";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { EFFECT_FUNCTIONS } from "../effect-functions";
import { splitValueTransform } from "../effect-functions/splitValueTransform";
import { setupShaderTransformationConfig } from "../helpers/generate-transform/setupShaderTransformConfig";
import { transformationToFunction } from "../helpers/generate-transform/transformationToFunction";

export const setUpFragmentEffects = (
  fragmentEffectFunctions: EffectFunctionConfig[],
  parameterMap: ShaderParameterMap
) => {
  const {
    unmergedTransformations,
    requiredFunctions,
    assignedVariableIds,
    advancedShaderVariables,
  } = getFragmentColors(fragmentEffectFunctions, parameterMap);

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
  };
};

export const getFragmentColors = (
  fragmentEffectFunctions: EffectFunctionConfig[],
  parameterMap: ShaderParameterMap
) => {
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedTransformations: string[] = [];
  const assignedVariableIds: string[] = [];
  const allAdvancedShaderVariables: AdvancedShaderVariableMap = new Map();
  fragmentEffectFunctions.forEach((effect) => {
    const fragmentEffectData = transformSetup(effect, parameterMap);

    if (fragmentEffectData) {
      unmergedTransformations.push(fragmentEffectData.transformation);
      allRequiredFunctions.push(fragmentEffectData.requiredFunctions);
      assignedVariableIds.push(fragmentEffectData.assignedVariableId ?? "");
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
  return {
    unmergedTransformations,
    requiredFunctions: mergedRequiredFunction,
    assignedVariableIds: Array.from(new Set(assignedVariableIds)),
    advancedShaderVariables: allAdvancedShaderVariables,
  };
};

export const transformSetup = (
  effectProps: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
) => {
  const { functionId, effects } = effectProps;
  const effectTransformationData = effects.flatMap((effect) => {
    const data = generateFragmentShaderTransformData(
      effect as FragmentEffectConfig,
      parameterMap
    );
    if (data) {
      return {
        id: effect.id,
        ...data,
      };
    }
    return [];
  });

  switch (functionId) {
    case EFFECT_FUNCTIONS.DEFAULT:
      return effectTransformationData[0];
    case EFFECT_FUNCTIONS.SPLIT_VALUE:
      return splitValueTransform(effectProps, effectTransformationData);
    default:
      return null;
  }
};

const generateFragmentShaderTransformData = (
  effect: FragmentEffectConfig,
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean = false
): TransformData | null => {
  const { effectType } = effect;
  const effectConfig = FRAGMENT_EFFECT_CONFIG_MAP[effectType];
  if (effectConfig) {
    const { transformationFunctions, transformation, advancedShaderVariables } =
      generateFragmentShaderTransformation(
        effectConfig.transformationConfig,
        effect,
        parameterMap,
        isSubEffect
      );
    // @ts-expect-error - this is a valid type
    const assignedVariableId = effectConfig?.assignedVariableId;

    return {
      transformation,
      requiredFunctions: [
        ...(effectConfig.functions || []),
        ...transformationFunctions,
      ],
      assignedVariableId,
      advancedShaderVariables,
    };
  }
  return null;
};

export const generateFragmentShaderTransformation = (
  transformationSchemas: ShaderTransformationSchema[],
  shaderEffectConfig: FragmentEffectConfig,
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean
): {
  transformation: string;
  transformationFunctions: ShaderFunction[];
  advancedShaderVariables: AdvancedShaderVariableMap;
} => {
  const { subEffects } = shaderEffectConfig;

  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = generateFragmentShaderTransformData(
        subEffect,
        parameterMap,
        true
      );
      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const transformationConfigs = setupShaderTransformationConfig(
    transformationSchemas,
    shaderEffectConfig,
    isSubEffect,
    subEffectDataArray,
    parameterMap
  );

  const shaderVariableTypes = transformationConfigs.flatMap(
    ({ assignedVariableId }) => {
      return assignedVariableId ?? [];
    }
  );

  const effectFunctions = transformationToFunction(
    transformationConfigs,
    shaderEffectConfig,
    parameterMap
  );

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
      inputIds,
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
        inputIds,
        returnValue,
        parameterMap,
        shaderEffectConfig.id,
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
    advancedShaderVariables,
  };
};
