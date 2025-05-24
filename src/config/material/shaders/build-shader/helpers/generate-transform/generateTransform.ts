import {
  ParameterConfig,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { VertexEffectProps } from "../../vertex-effects/vertexEffects.types";
import { FormattedFunctionConfig, FunctionParameter } from "./types";
import {
  ADVANCED_SHADER_VARIABLE_EFFECT_CODE,
  DEFAULT_FRAGMENT_PARAMETERS,
  DEFAULT_VERTEX_PARAMETERS,
} from "./consts";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { FragmentEffectProps } from "../../fragment-effects/fragmentShader.types";

import { formatEffectFunctions } from "./formatEffectFunctions";
import { getShaderVariableKeys } from "./functions";

const shaderSafeGuid = (guid: string) => {
  return guid.slice(0, 8);
};

const formatFunctionParameters = (
  defaultParameters: Partial<FunctionParameter>[],
  effectParameters: ParameterConfig[],
  effectGuid: string
) => {
  return defaultParameters
    .map((effect) => ({
      ...effect,
      functionId: `${effect.id}_${shaderSafeGuid(effectGuid)}`,
    }))
    .concat(
      effectParameters.flatMap((effectParameter) => {
        const { id: parameterId, guid } = effectParameter;
        if (
          effectParameter.isUniform ||
          effectParameter.isAttribute ||
          effectParameter.isVarying
        ) {
          return [];
        }
        return {
          id: parameterId,
          valueType: effectParameter.valueType,
          functionId: `${parameterId}_${shaderSafeGuid(guid)}`,
        };
      })
    ) as FunctionParameter[];
};

const prepareFunctionConfigs = (
  configs: ShaderTransformationConfig[],
  shaderParameters: FunctionParameter[],
  effectId: string
): FormattedFunctionConfig[] => {
  const functionIds = configs.map(({ id }) => id);
  const parameterIds = shaderParameters.map(({ id }) => id);
  return configs.map((config) => {
    const { id, functionContent } = config;
    const functionDependencies = functionContent.flatMap((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => functionIds.includes(variable))
      ) {
        return variables.filter((variable) => functionIds.includes(variable));
      }
      return [];
    });

    // Get parameters from dependent functions
    const dependentFunctionParams = functionDependencies.flatMap((depId) => {
      const dependentFunction = configs.find((f) => f.id === depId);
      if (!dependentFunction) return [];

      return dependentFunction.functionContent.flatMap((line) => {
        const variables = line
          .match(/{{(\w+)}}/g)
          ?.map((match) => match.replace(/[{}]/g, ""));
        if (
          variables &&
          variables.some((variable) => parameterIds.includes(variable))
        ) {
          return variables.filter((variable) =>
            parameterIds.includes(variable)
          );
        }
        return [];
      });
    });

    const functionParameterIds = functionContent.flatMap((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => parameterIds.includes(variable))
      ) {
        return variables.filter((variable) => parameterIds.includes(variable));
      }
      return [];
    });

    // Combine original parameters with dependent function parameters
    const allParameterIds = [
      ...new Set([...functionParameterIds, ...dependentFunctionParams]),
    ];

    return {
      ...config,
      functionName: `${id}_${shaderSafeGuid(effectId)}`,
      functionDependencyIds: [...new Set(functionDependencies)],
      functionParameterIds: allParameterIds,
      functionInstantiationParameterIds: allParameterIds.map((id) =>
        getShaderVariableKeys(id)
      ),
    };
  });
  // check for any additional function configs to be created via varying references
  // - check varyings for any function ids
  // - if matching function in current config - check for a function add the instantiation parameter config
  // - if no function parameter config - ignore
  // - if function parameter config duplicate the function config - add the instantiation parameter config
};

export const generateVertexShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: VertexEffectProps
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters } = effectProps;
  const shaderParameters = formatFunctionParameters(
    DEFAULT_VERTEX_PARAMETERS,
    effectParameters,
    id
  );

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderParameters,
    id
  );

  const effectFunctions = formatEffectFunctions(
    formattedFunctionConfigs,
    shaderParameters,
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

  const mainFunctionInstantiations = effectFunctions.flatMap(
    ({ functionInstantiation, assignedVariableName }) => {
      if (!assignedVariableName) {
        return [];
      }
      return `${assignedVariableName} = ${functionInstantiation};`;
    }
  );

  const transformation = [
    ...constantDeclarations,
    ...mainFunctionInstantiations,
  ].join("\n");

  return { transformation, transformationFunctions: effectFunctions };
};
export const generateFragmentShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: FragmentEffectProps
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters } = effectProps;
  const shaderParameters = formatFunctionParameters(
    DEFAULT_FRAGMENT_PARAMETERS,
    effectParameters,
    id
  );

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    shaderParameters,
    id
  );
  const shaderVariableTypes = formattedFunctionConfigs.flatMap(
    ({ shaderVariableType }) => {
      return shaderVariableType ?? [];
    }
  );
  const advancedShaderVariables = shaderVariableTypes.flatMap(
    (shaderVariableType) => {
      const effectCode =
        ADVANCED_SHADER_VARIABLE_EFFECT_CODE[shaderVariableType];
      if (effectCode) {
        return effectCode;
      }
      return [];
    }
  );

  const effectFunctions = formatEffectFunctions(
    formattedFunctionConfigs,
    shaderParameters,
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
    ({ functionInstantiation, assignedVariableName }) => {
      if (!assignedVariableName) {
        return [];
      }
      return `${assignedVariableName} = ${functionInstantiation};`;
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
