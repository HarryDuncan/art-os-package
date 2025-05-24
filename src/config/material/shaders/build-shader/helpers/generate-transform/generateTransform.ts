import {
  ParameterConfig,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { FUNCTION_TYPES, SHADER_VARIABLE_TYPES } from "../../constants";
import { VERTEX_POINT_NAME } from "../../vertex-effects/vertexEffects.consts";
import { VertexEffectProps } from "../../vertex-effects/vertexEffects.types";
import { FormattedFunctionConfig, FunctionParameter } from "./types";
import {
  ADVANCED_SHADER_VARIABLE_EFFECT_CODE,
  DEFAULT_FRAGMENT_PARAMETERS,
  DEFAULT_VERTEX_PARAMETERS,
} from "./consts";
import { shaderValueTypeInstantiation } from "../safeParseValue";
import { FragmentEffectProps } from "../../fragment-effects/fragmentShader.types";
import { FRAG_COLOR_NAME } from "../../fragment-effects/fragmentEffects.consts";
import { getAssignedVariableName } from "./functions";
import { formatEffectCodeLines } from "./formatEffectCode";

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
    };
  });
};

const DEFAULT_SHADER_VARIABLE_KEYS = {
  pointPosition: VERTEX_POINT_NAME,
  fragColor: FRAG_COLOR_NAME,
};

const formatDefaults = (id: string) => {
  const shaderVariableId =
    DEFAULT_SHADER_VARIABLE_KEYS[
      id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
    ];
  return shaderVariableId ?? id;
};

const setUpFunctionInstantiation = (
  shaderVariableType: string | undefined,
  functionName: string,
  functionParameterIds: string[]
) => {
  if (!shaderVariableType) {
    return null;
  }
  const formattedFunctionParameterIds = functionParameterIds.map((id) => {
    return `${formatDefaults(id)}`;
  });
  const assignedVariableName = getAssignedVariableName(shaderVariableType);
  return ` ${assignedVariableName} = ${functionName}(${formattedFunctionParameterIds.join(
    ", "
  )});`;
};

const getShaderFunctionType = (shaderVariableType: string | undefined) => {
  switch (shaderVariableType) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return FUNCTION_TYPES.VERTEX_ROOT;
    default:
      return FUNCTION_TYPES.CONFIGURED_STATIC;
  }
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

  const effectFunctions = formattedFunctionConfigs.map(
    ({
      returnValue,
      functionName,
      functionParameterIds,
      functionContent,
      shaderVariableType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = functionParameterIds.flatMap((parameterId) => {
        const parameter = shaderParameters.find((p) => p.id === parameterId);
        if (!parameter) {
          return [];
        }
        return `${shaderValueTypeInstantiation(parameter.valueType)} ${
          parameter.functionId
        }`;
      });
      const functionDeclaration = `${returnTypeString} ${functionName}(${functionInputs.join(
        ", "
      )}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        functionContent,
        shaderParameters,
        effectParameters,
        formattedFunctionConfigs
      );

      const functionInstantiation = setUpFunctionInstantiation(
        shaderVariableType,
        functionName,
        functionParameterIds
      );

      const shaderFunctionType = getShaderFunctionType(shaderVariableType);
      const shaderFunctionConfig = {
        id: functionName,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
        functionType: shaderFunctionType,
      };
      return {
        shaderFunctionConfig,
        functionInstantiation,
      };
    }
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
    ({ functionInstantiation }) => {
      if (!functionInstantiation) {
        return [];
      }
      return functionInstantiation;
    }
  );

  const transformation = [
    ...constantDeclarations,
    ...mainFunctionInstantiations,
  ].join("\n");

  const transformationFunctions = effectFunctions.map(
    ({ shaderFunctionConfig }) => {
      return shaderFunctionConfig;
    }
  );

  return { transformation, transformationFunctions };
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

  const effectFunctions = formattedFunctionConfigs.map(
    ({
      returnValue,
      functionName,
      functionParameterIds,
      functionContent,
      shaderVariableType,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = functionParameterIds.flatMap((parameterId) => {
        const parameter = shaderParameters.find((p) => p.id === parameterId);
        if (!parameter) {
          return [];
        }
        return `${shaderValueTypeInstantiation(parameter.valueType)} ${
          parameter.functionId
        }`;
      });
      const functionDeclaration = `${returnTypeString} ${functionName}(${functionInputs.join(
        ", "
      )}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        functionContent,
        shaderParameters,
        effectParameters,
        formattedFunctionConfigs
      );

      const functionInstantiation = setUpFunctionInstantiation(
        shaderVariableType,
        functionName,
        functionParameterIds
      );

      const shaderFunctionType = getShaderFunctionType(shaderVariableType);
      const shaderFunctionConfig = {
        id: functionName,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
        functionType: shaderFunctionType,
      };
      return {
        shaderFunctionConfig,
        functionInstantiation,
      };
    }
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
    ({ functionInstantiation }) => {
      if (!functionInstantiation) {
        return [];
      }
      return functionInstantiation;
    }
  );

  const transformation = [
    ...constantDeclarations,
    ...advancedShaderVariablesInstantiation,
    ...mainFunctionInstantiations,
    ...advancedShaderVariablesAssignment,
  ].join("\n");

  const transformationFunctions = effectFunctions.map(
    ({ shaderFunctionConfig }) => {
      return shaderFunctionConfig;
    }
  );

  return { transformation, transformationFunctions };
};
