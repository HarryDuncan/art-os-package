import { mergeUnique } from "../../../../../../utils/mergeUnique";
import {
  AdvancedShaderVariableMap,
  ShaderParameterMap,
  TransformData,
} from "../../buildShader.types";
import { EffectFunctionConfig } from "../../buildShader.types";

export const splitValueTransform = (
  effectTransforms: (TransformData & { id: string })[],
  effectFunctionTransform: EffectFunctionConfig,
  parameterMap: ShaderParameterMap
): TransformData => {
  const inputParameters = Array.from(parameterMap.values());
  const inputMappingData = Object.entries(
    effectFunctionTransform.inputMapping || {}
  ).map(([key, value]) => {
    const inputParameter = inputParameters.find(
      (parameter) => parameter.guid === value.itemId
    );
    if (!inputParameter) {
      throw new Error(`No input parameter found for id ${value.itemId}`);
    }
    return {
      key,
      inputParameter,
    };
  });
  const { value } = effectFunctionTransform;

  // Check if we have the required data
  if (!inputMappingData || inputMappingData.length === 0) {
    throw new Error("No input parameters found for split value transform");
  }

  if (!value || !value.splitValues || value.splitValues.length === 0) {
    throw new Error("No split values found for split value transform");
  }

  const inputParameter = inputMappingData[0].inputParameter; // There's only one input parameter
  const { splitValues } = value;

  // Calculate cumulative split values for WebGL-safe comparisons
  const cumulativeSplitValues: number[] = [];
  let sum = 0;
  for (let i = 0; i < splitValues.length; i++) {
    sum += splitValues[i];
    cumulativeSplitValues.push(sum);
  }

  // Build the if-else if structure for all split values
  const buildSplitValueCondition = (): string => {
    let result = "";

    // Build if-else if statements for each split value
    for (let i = 0; i < splitValues.length; i++) {
      const currentCumulativeValue = cumulativeSplitValues[i];
      const outputKey = i.toString();
      const outputMapping = effectFunctionTransform.outputMapping[outputKey];

      if (!outputMapping) {
        throw new Error(`No output mapping found for key ${outputKey}`);
      }

      const effectTransform = effectTransforms.find(
        (transform) => transform.id === outputMapping.itemId
      );
      if (!effectTransform) {
        throw new Error(
          `No effect transform found for id ${outputMapping.itemId}`
        );
      }

      // Build the condition with WebGL-safe comparisons
      let condition: string;
      if (i === 0) {
        // First condition: inputParameter < cumulativeSplitValues[0]
        condition = `${inputParameter.key} < ${currentCumulativeValue.toFixed(
          6
        )}`;
      } else {
        // Subsequent conditions: inputParameter >= prevCumulativeValue && inputParameter < currentCumulativeValue
        const prevCumulativeValue = cumulativeSplitValues[i - 1];
        condition = `${inputParameter.key} >= ${prevCumulativeValue.toFixed(
          6
        )} && ${inputParameter.key} < ${currentCumulativeValue.toFixed(6)}`;
      }

      // Add if or else if statement
      if (i === 0) {
        result += `if(${condition}) {
      ${effectTransform.transformation}
    }`;
      } else {
        result += ` else if(${condition}) {
      ${effectTransform.transformation}
    }`;
      }
    }

    // Add the final else case for values >= the last cumulative split value
    const lastOutputKey = splitValues.length.toString();
    const lastOutputMapping =
      effectFunctionTransform.outputMapping[lastOutputKey];

    if (lastOutputMapping) {
      const lastEffectTransform = effectTransforms.find(
        (transform) => transform.id === lastOutputMapping.itemId
      );
      if (lastEffectTransform) {
        result += ` else {
      ${lastEffectTransform.transformation}
    }`;
      }
    }

    return result;
  };

  const updatedTransformation = buildSplitValueCondition();

  // Merge all effectTransforms, but replace the transformation with the updated one
  // We'll merge arrays and objects as appropriate, using the first effectTransform as a base
  // (since all effectTransforms are for the same splitValue function, this is safe)
  // We'll union/merge arrays and maps as needed

  // If there are no effectTransforms, throw
  if (!effectTransforms || effectTransforms.length === 0) {
    throw new Error("No effect transforms provided for split value transform");
  }

  // Helper to merge arrays and deduplicate by string value

  // Helper to merge AdvancedShaderVariableMap
  const mergeAdvancedShaderVariableMaps = (
    maps: AdvancedShaderVariableMap[]
  ): AdvancedShaderVariableMap => {
    const merged: AdvancedShaderVariableMap = new Map();
    maps.forEach((map) => {
      Array.from(map.entries()).forEach(([key, variable]) => {
        merged.set(key, variable);
      });
    });
    return merged;
  };

  // Merge all fields except transformation
  const mergedRequiredFunctions = mergeUnique(
    effectTransforms.map((t) => t.requiredFunctions)
  );
  const mergedAssignedVariableIds = mergeUnique(
    effectTransforms.map((t) =>
      t.assignedVariableId ? [t.assignedVariableId] : []
    )
  );

  const mergedAdvancedShaderVariables = mergeAdvancedShaderVariableMaps(
    effectTransforms.map((t) => t.advancedShaderVariables)
  );

  // Compose the merged TransformData
  const merged: TransformData = {
    transformation: updatedTransformation,
    requiredFunctions: mergedRequiredFunctions,
    assignedVariableId:
      mergedAssignedVariableIds.length > 0
        ? mergedAssignedVariableIds[0]
        : null,
    advancedShaderVariables: mergedAdvancedShaderVariables,
  };

  return merged;
};
