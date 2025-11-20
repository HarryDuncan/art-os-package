import {
  EffectConfig,
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
} from "../../schema";
import { shaderValueTypeInstantiation } from "./helpers/shaderValues";
import { valueToShader } from "./helpers/shaderValues";
import { ShaderParameterMap, TransformDefinition } from "../types";
import { filterParametersByType } from "../../utils";
import { getTransformsMappedToParameters } from "./transforms/getTransfomsMappedToParameters";

export const generateConstants = (
  shaderParameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
): {
  constantDeclaration: string;
  constantInstantiation: string[];
  constantTransformDefinitions: TransformDefinition[];
} => {
  const constantParameters = filterParametersByType(
    shaderParameterMap,
    SHADER_PROPERTY_TYPES.CONSTANT
  );
  const constantDeclaration = [
    "// CONSTANT DECLARATIONS",
    ...constantParameters.map(({ key, valueType, value }) => {
      return `${shaderValueTypeInstantiation(
        valueType
      )} ${key} = ${valueToShader(valueType, value ?? "")};`;
    }),
  ].join("\n");

  const { transformDefinitions, transformAssignments } = getFunctionConstants(
    constantParameters,
    shaderParameterMap,
    functionConfigs
  );

  return {
    constantDeclaration,
    constantInstantiation: [...transformAssignments],
    constantTransformDefinitions: transformDefinitions,
  };
};

const getFunctionConstants = (
  constantParameters: ParameterConfig[],
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
) => {
  const configuredTransforms = getTransformsMappedToParameters(
    constantParameters,
    parameterMap,
    functionConfigs
  );
  const transformDefinitions = configuredTransforms.flatMap(
    (transform) => transform.transformDefinitions
  );
  const transformAssignments = configuredTransforms.flatMap(
    ({ transformAssignments }) => transformAssignments
  );
  return { transformDefinitions, transformAssignments };
};
