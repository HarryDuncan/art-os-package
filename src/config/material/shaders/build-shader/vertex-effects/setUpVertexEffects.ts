import { mergeShaderFunctions } from "../helpers/mergeShaderFunctions";
import {
  VERTEX_EFFECT_CONFIG_MAP,
  VERTEX_POINT_NAME,
} from "./vertexEffects.consts";
import { VertexEffectProps } from "./vertexEffects.types";
import {
  ShaderFunction,
  ShaderParameterMap,
  ShaderTransformationSchema,
  VertexEffectConfig,
} from "../buildShader.types";
import { setUpFunctionInstantiation } from "../helpers/generate-transform/functions";
import { FUNCTION_TYPES } from "../constants";
import {
  EffectFunctionConfig,
  ShaderEffectConfig,
  TransformData,
} from "../buildShader.types";
import { setupShaderTransformationConfig } from "../helpers/generate-transform/setupShaderTransformConfig";
import { transformationToFunction } from "../helpers/generate-transform/transformationToFunction";

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

export const transformSetup = (
  effectProps: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
) => {
  const { functionId, effects } = effectProps;
  const effectTransformationData = effects.flatMap((effect) => {
    return generateShaderTransformData(
      effect as VertexEffectProps,
      false,
      parameterMap
    );
  });

  switch (functionId) {
    case "DEFAULT_EFFECT_FUNCTION":
      return effectTransformationData[0];
    default:
      return null;
  }
};

const generateShaderTransformData = (
  effect: VertexEffectProps,
  isSubEffect: boolean,
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { effectType } = effect;
  const effectConfig = VERTEX_EFFECT_CONFIG_MAP[effectType];
  if (effectConfig) {
    const { transformationFunctions, transformation } =
      generateVertexShaderTransforms(
        effectConfig.transformationConfig as ShaderTransformationSchema[],
        effect as VertexEffectProps,
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
    } as TransformData;
  }
  return null;
};

export const generateVertexShaderTransforms = (
  transformConfig: ShaderTransformationSchema[],
  effectProps: VertexEffectProps,
  parameterMap: ShaderParameterMap,
  isSubEffect: boolean
): {
  transformation: string;
  transformationFunctions: ShaderFunction[];
  mainFunctionInstantiations: any;
} => {
  const { subEffects } = effectProps;
  const subEffectDataArray =
    subEffects?.flatMap((subEffect) => {
      const subEffectData = generateShaderTransformData(
        subEffect,
        true,
        parameterMap
      );
      if (subEffectData) {
        return subEffectData;
      }
      return [];
    }) ?? [];

  const transformFunctionConfigs = setupShaderTransformationConfig(
    transformConfig,
    effectProps as unknown as ShaderEffectConfig,
    isSubEffect,
    subEffectDataArray,
    parameterMap
  );

  const effectFunctions = transformationToFunction(
    transformFunctionConfigs,
    effectProps as unknown as VertexEffectConfig,
    parameterMap
  );

  const mainFunctionInstantiations = effectFunctions
    .sort((a, b) =>
      a.dontDeclare === b.dontDeclare ? 0 : a.dontDeclare ? -1 : 1
    )
    .flatMap(
      ({
        inputIds,
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
          inputIds,
          returnValue,
          parameterMap,
          effectProps.id,
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
    mainFunctionInstantiations,
    transformationFunctions,
  };
};
