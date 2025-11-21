import { EffectConfig, ShaderTransformationSchema } from "../../../../schema";
import { FUNCTION_TYPES } from "../../../consts";
import {
  ConfiguredTransform,
  ShaderParameterMap,
  TransformDefinition,
} from "../../../types";
import { getTransformCode } from "./getTransformCode";
import { getTransformInputs } from "./getTransformInputs";
import { getTransformInstantiation } from "./getTransformInstantiation";
import { getTransformOutputConfig } from "./getTransformOutputConfig";

export const configureTransform = (
  effectConfig: EffectConfig,
  parameterMap: ShaderParameterMap
): ConfiguredTransform => {
  const { transformSchema } = effectConfig;
  const { subEffects, mainEffect } = separateTransformSchema(transformSchema);
  if (!mainEffect) return {} as ConfiguredTransform;

  // TODO - handle unique transform/function names
  const transformName = mainEffect.key;

  const { inputParameterMap, transformDeclaration } = getTransformInputs(
    mainEffect,
    parameterMap,
    effectConfig
  );
  console.log(mainEffect);
  console.log(inputParameterMap);
  console.log(transformDeclaration);

  const subEffectDefinitions: TransformDefinition[] = subEffects.map(
    (effect) => {
      const { inputParameterMap, transformDeclaration } = getTransformInputs(
        effect,
        parameterMap,
        effectConfig
      );
      const subEffectOutputConfig = getTransformOutputConfig(
        effect,
        effectConfig,
        parameterMap
      );
      const transformCode = getTransformCode(
        effect,
        transformName,
        // TODO - fix up sub effects
        subEffects.map((subEffect) => subEffect.key),
        inputParameterMap,
        effectConfig
      );
      return {
        id: effectConfig.guid,
        functionName: effect.key,
        definitionCode: [transformDeclaration, ...transformCode],
        transformType: FUNCTION_TYPES.SUB_TRANSFORM,
        outputConfig: subEffectOutputConfig,
      };
    }
  );

  console.log(subEffectDefinitions);

  const mainOutputConfig = getTransformOutputConfig(
    mainEffect,
    effectConfig,
    parameterMap
  );
  const transformCode = getTransformCode(
    mainEffect,
    transformName,
    // TODO - fix up sub effects
    subEffects.map((effect) => effect.key),
    inputParameterMap,
    effectConfig
  );

  const transformAssignment = getTransformInstantiation(
    mainOutputConfig,
    transformName,
    inputParameterMap
  );

  const mainTransformDefinition: TransformDefinition = {
    id: effectConfig.guid,
    functionName: transformName,
    definitionCode: [transformDeclaration, ...transformCode],
    transformType: FUNCTION_TYPES.TRANSFORM,
  };

  return {
    guid: effectConfig.guid,
    transformAssignments: [transformAssignment],
    transformDefinitions: [mainTransformDefinition, ...subEffectDefinitions],
    outputConfigs: mainEffect.outputConfig ?? [],
  };
};

const separateTransformSchema = (
  transformSchema: ShaderTransformationSchema[] | undefined
) => {
  if (!transformSchema)
    return { subEffects: [], mainEffect: null } as {
      subEffects: ShaderTransformationSchema[];
      mainEffect: ShaderTransformationSchema | null;
    };
  return transformSchema.reduce(
    (acc, schema) => {
      if (schema.isSubFunction) {
        acc.subEffects.push(schema);
      } else {
        acc.mainEffect = schema;
      }
      return acc;
    },
    { subEffects: [], mainEffect: null } as {
      subEffects: ShaderTransformationSchema[];
      mainEffect: ShaderTransformationSchema | null;
    }
  );
};
