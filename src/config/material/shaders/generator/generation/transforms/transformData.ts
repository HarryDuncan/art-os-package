import {
  ShaderEffectConfig,
  ShaderTransformationOutputConfig,
  ShaderTransformationSchema,
} from "../../../schema";
import { ShaderFunction, ShaderParameterMap, TransformData } from "../../types";
import { functionInstantiation } from "../helpers/functionInstantiation";
import { setupShaderTransformationConfigs } from "./formatting/transformConfig";
import { transformFunction } from "./formatting/transformFunction";

export const generateShaderTransformData = (
  effect: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { effectSchemas } = effect;
  if (effectSchemas) {
    const { transformationFunctions, transformation, outputConfigs } =
      generateTransform(effectSchemas, effect, parameterMap);

    return {
      transformation,
      requiredFunctions: [
        ...(transformationFunctions || []),
        ...transformationFunctions,
      ],
      outputConfigs,
    };
  }
  return null;
};

export const generateTransform = (
  transformConfig: ShaderTransformationSchema[],
  effectConfig: ShaderEffectConfig,
  parameterMap: ShaderParameterMap
): {
  transformation: string[];
  transformationFunctions: ShaderFunction[];
  mainFunctionInstantiations: string[];
  outputConfigs: ShaderTransformationOutputConfig[];
} => {
  const { guid: effectId } = effectConfig;

  const transformationConfigs = setupShaderTransformationConfigs(
    transformConfig,
    effectConfig,
    parameterMap
  );

  const effectFunctions = transformFunction(
    transformationConfigs,
    effectConfig
  );

  const mainFunctionInstantiations = effectFunctions
    .sort((a, b) =>
      a.dontDeclare === b.dontDeclare ? 0 : a.dontDeclare ? -1 : 1
    )
    .flatMap(({ inputMap, functionName, outputConfig, isSubFunction }) => {
      if (isSubFunction) {
        return [];
      }
      return functionInstantiation(
        outputConfig,
        functionName,
        inputMap,
        effectId
      );
    });

  const transformation = [...mainFunctionInstantiations];

  const transformationFunctions = [
    ...effectFunctions.filter(({ dontDeclare }) => {
      return !dontDeclare;
    }),
    // ...subEffectDataArray.flatMap(({ requiredFunctions }) => requiredFunctions),
  ];
  return {
    transformation,
    mainFunctionInstantiations,
    transformationFunctions,
    outputConfigs: effectFunctions.flatMap(({ outputConfig }) => outputConfig),
  };
};
