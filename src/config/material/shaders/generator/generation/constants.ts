import { SHADER_PROPERTY_TYPES } from "../../schema";
import { shaderValueTypeInstantiation } from "./helpers/shaderValues";
import { valueToShader } from "./helpers/shaderValues";
import { DefinedEffectFunction, ShaderParameterMap } from "../types";
import { transformsFromParameters } from "./transforms/transformsFromParameters";

export const generateConstants = (
  shaderParameterMap: ShaderParameterMap
): {
  constantDeclaration: string;
  constantInstantiation: string[];
  constantFunctionDeclarations: DefinedEffectFunction[];
} => {
  const constantParameters = Array.from(shaderParameterMap.values()).filter(
    ({ parameterType }) => parameterType === SHADER_PROPERTY_TYPES.CONSTANT
  );
  const constantDeclaration = [
    "// CONSTANT DECLARATIONS",
    ...constantParameters.map(({ shaderParameterId, valueType, value }) => {
      return `${shaderValueTypeInstantiation(
        valueType
      )} ${shaderParameterId} = ${valueToShader(valueType, value ?? "")};`;
    }),
  ].join("\n");

  const functionBasedConstants = constantParameters.filter(
    (parameter) => parameter.isFunctionBased
  );
  const { functionInstantiations, transformFunctions } =
    transformsFromParameters(functionBasedConstants, shaderParameterMap);

  console.log("functionInstantiations", functionInstantiations);
  console.log("transformFunctions", transformFunctions);
  return {
    constantDeclaration,
    constantInstantiation: functionInstantiations,
    constantFunctionDeclarations: transformFunctions,
  };
};
