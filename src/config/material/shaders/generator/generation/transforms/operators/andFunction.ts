import { OperatorConfig, EffectConfig } from "../../../../schema";
import { ShaderParameterMap, TransformData } from "../../../types";
import { transformationConfigFromFunctionParameter } from "../formatting/transformConfig";
import { transformFunction } from "../formatting/transformFunction";
import { functionInstantiation } from "../../helpers/functionInstantiation";

export const andFunctionTransform = (
  effectTransforms: (TransformData & { id: string })[],
  effectFunctionTransform: OperatorConfig,
  parameterMap: ShaderParameterMap
): TransformData => {
  const transforms = [];
  const inputParameters = Array.from(parameterMap.values());
  const inputMappingData = Object.entries(
    effectFunctionTransform.inputMapping || {}
  ).flatMap(([key, value]) => {
    const inputParameter = inputParameters.find(
      (parameter) => parameter.guid === value.itemId
    );
    if (!inputParameter) {
      console.error(`No input parameter found for id ${value.itemId}`);
      return [];
    }
    return {
      key,
      inputParameter,
    };
  });

  const functionBasedInputs = inputMappingData.flatMap((input) => {
    if (input.inputParameter.isFunctionBased) {
      return input.inputParameter;
    }
    return [];
  });

  const transformations = functionBasedInputs.flatMap((item) => {
    return transformationConfigFromFunctionParameter(item, parameterMap) ?? [];
  });

  const functionDefinitions = transformFunction(transformations, {
    id: "effectId",
  } as unknown as EffectConfig);
  const functionInstantiations = functionDefinitions.flatMap(
    ({ outputConfig, functionName, inputMap }) => {
      return functionInstantiation(
        outputConfig,
        functionName,
        inputMap,
        "effectId"
      );
    }
  );

  transforms.push(...functionInstantiations);

  // --- Begin: AND logic and output mapping ---

  // Build the AND condition: (param1 == 1.0) && (param2 == 1.0) ...
  const andConditions = inputMappingData
    .map(({ inputParameter }) => {
      // Use the parameter's mapped key or fallback to id
      // All are floats, so compare to 1.0
      // Use .mappedParameterKey if present, else .shaderParameterId, else .id
      const paramKey =
        inputParameter.mappedParameterKey ||
        inputParameter.shaderParameterId ||
        inputParameter.key;
      return `(${paramKey} == 1.0)`;
    })
    .join(" && ");

  // Find true/false output mapping
  const outputMapping = effectFunctionTransform.outputMapping || {};
  const trueValueId = outputMapping.trueValue;
  const falseValueId = outputMapping.falseValue;

  // Find the effectTransforms associated with true/falseValue
  const trueTransform = trueValueId
    ? effectTransforms.find((t) => t.id === trueValueId.itemId)
    : null;
  const falseTransform = falseValueId
    ? effectTransforms.find((t) => t.id === falseValueId.itemId)
    : null;

  // Compose the conditional WebGL code
  let conditionalCode = "";
  if (trueTransform || falseTransform) {
    conditionalCode += `if(${andConditions}){\n`;
    if (trueTransform) {
      conditionalCode += trueTransform.transformation + "\n";
    }
    conditionalCode += "}";
    if (falseTransform) {
      conditionalCode += " else {\n";
      conditionalCode += falseTransform.transformation + "\n";
      conditionalCode += "}";
    }
    conditionalCode += "\n";
  }

  // --- End: AND logic and output mapping ---

  const requiredFunctions = [
    ...effectTransforms.flatMap((t) => t.requiredFunctions),
    ...functionDefinitions,
  ];

  // Compose the merged transformation: function instantiations + conditional code
  const updatedTransformation =
    transforms.join("\n") + (conditionalCode ? "\n" + conditionalCode : "");

  const outputConfigs = functionDefinitions.flatMap(
    ({ outputConfig }) => outputConfig
  );
  // Compose the merged TransformData
  const merged: TransformData = {
    transformation: [updatedTransformation],
    requiredFunctions,
    outputConfigs,
  };

  return merged;
};
