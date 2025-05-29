import {
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import {
  ADVANCED_SHADER_VARIABLE_EFFECT_CODE,
  DEFAULT_FRAGMENT_PARAMETERS,
} from "./consts";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { FragmentEffectProps } from "../../fragment-effects/fragmentShader.types";
import { formatEffectFunctions } from "./formatEffectFunctions";
import { formatShaderEffectParameters } from "./formatShaderEffectParameters";
import { prepareFunctionConfigs } from "./prepareFunctionConfigs";
import { setUpFunctionInstantiation } from "./functions";

export const generateFragmentShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: FragmentEffectProps
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters } = effectProps;

  const shaderEffectParameters = formatShaderEffectParameters(
    DEFAULT_FRAGMENT_PARAMETERS,
    effectParameters,
    id
  );

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderEffectParameters,
    id,
    [],
    false,
    []
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

  const effectFunctions = formatEffectFunctions(
    formattedFunctionConfigs,
    shaderEffectParameters,
    effectParameters
  );

  // // if parameters are just consts then add them
  const constantDeclarations = effectParameters
    .filter((p) => !p.isUniform && !p.isAttribute && !p.isVarying)
    .map((p) => {
      return `${shaderValueTypeInstantiation(p.valueType)} ${p.id} = ${
        p.value
      };`;
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
    ({ functionParameters, assignedVariableId, functionName }) => {
      if (!assignedVariableId) {
        return [];
      }

      return setUpFunctionInstantiation(
        assignedVariableId,
        functionName,
        functionParameters
      );
    }
  );

  const transformation = [
    ...constantDeclarations,
    ...advancedShaderVariablesInstantiation,
    ...mainFunctionInstantiations,
    ...advancedShaderVariablesAssignment,
  ].join("\n");

  return { transformation, transformationFunctions: effectFunctions };
};
