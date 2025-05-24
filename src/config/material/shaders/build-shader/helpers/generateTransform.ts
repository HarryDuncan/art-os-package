import {
  ParameterConfig,
  ShaderFunction,
  ShaderTransformationConfig,
  TransformationConfig,
} from "../buildShader.types";
import {
  FUNCTION_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../constants/buildShader.consts";
import { SHADER_PROPERTY_VALUE_TYPES } from "../constants/shader.consts";
import { VERTEX_POINT_NAME } from "../vertex-effects/vertexEffects.consts";
import { VertexEffectProps } from "../vertex-effects/vertexEffects.types";
import { safeParseValue, shaderValueTypeInstantiation } from "./safeParseValue";

export const generateShaderTransformationOld = (
  config: TransformationConfig,
  uniforms: ParameterConfig[]
) => {
  let transformation = config.prefix ?? "";

  if (config.singleInstance) {
    config.effectCode.forEach((line: string) => {
      let processedLine = line;

      transformation += processedLine + "\n";
    });
  } else {
    if (!config.allowedValueTypes) {
      console.warn(
        `No allowedValueTypes has been configured for ${config.effectName}`
      );
      return "";
    }
    const allowedUniforms = uniforms.filter((uniform) =>
      (config.allowedValueTypes as unknown as string[]).includes(
        uniform.valueType
      )
    );
    allowedUniforms.forEach((uniform, index) => {
      // Add instantiation
      transformation += `${shaderValueTypeInstantiation(
        config.instantiationType || uniform.valueType
      )} ${config.instantiationName}_${index} = ${
        config.instantiationValue
      };\n`;

      // Process effect code
      config.effectCode.forEach((line: string) => {
        let processedLine = line;

        // Replace placeholders
        processedLine = processedLine.replace(/{{(\w+)}}/g, (match, key) => {
          if (key === "EFFECT") {
            return `${safeParseValue(
              uniform.id,
              uniform.valueType as string,
              config.instantiationType || uniform.valueType
            )}`;
          }
          return `${key}_${index}`;
        });

        transformation += processedLine + "\n";
      });
    });
  }

  return transformation;
};

const DEFAULT_VERTEX_PARAMETERS: Partial<FunctionParameter>[] = [
  {
    id: "pointPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    default: true,
  },
];

type FunctionParameter = {
  id: string;
  valueType: string;
  functionId: string;
  default?: boolean;
};

const shaderSafeGuid = (guid: string) => {
  return guid.slice(0, 8);
};

type FormattedFunctionConfig = ShaderTransformationConfig & {
  functionName: string;
  functionDependencyIds: string[];
  functionParameterIds: string[];
};

const formatFunctionParameters = (
  effectParameters: ParameterConfig[],
  effectGuid: string
) => {
  return DEFAULT_VERTEX_PARAMETERS.map((effect) => ({
    ...effect,
    functionId: `${effect.id}_${shaderSafeGuid(effectGuid)}`,
  })).concat(
    effectParameters.flatMap((effectParameter) => {
      const { id: parameterId, guid } = effectParameter;
      if (effectParameter.isUniform) {
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
  functionParameters: FunctionParameter[],
  effectId: string
): FormattedFunctionConfig[] => {
  const functionIds = configs.map(({ id }) => id);
  const parameterIds = functionParameters.map(({ id }) => id);
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
    return {
      ...config,
      functionName: `${id}_${shaderSafeGuid(effectId)}`,
      functionDependencyIds: [...new Set(functionDependencies)],
      functionParameterIds: [...new Set(functionParameterIds)],
    };
  });
};

const setUpFunctionInstantiation = (
  assignedVariableName: string,
  functionName: string,
  functionParameters: FunctionParameter[]
) => {
  return ` ${assignedVariableName} = ${functionName}(${functionParameters
    .map((p) => p.functionId)
    .join(", ")})`;
};

const getAssignedVariableName = (shaderVariableType: string | undefined) => {
  switch (shaderVariableType) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
      return VERTEX_POINT_NAME;
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return "gl_PointSize";
    default:
      return null;
  }
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
export const generateShaderTransformation = (
  configs: ShaderTransformationConfig[],
  effectProps: VertexEffectProps
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters } = effectProps;
  const functionParameters = formatFunctionParameters(effectParameters, id);

  const formattedFunctionConfigs = prepareFunctionConfigs(
    configs,
    functionParameters,
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
        const parameter = functionParameters.find((p) => p.id === parameterId);
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

      const formattedFunctionContent = functionContent.map((line) => {
        return line.replace(/{{(\w+)}}/g, (match, key) => {
          const parameter = functionParameters.find((p) => p.id === key);

          if (!parameter) {
            const uniform = effectParameters.find((p) => p.id === key);
            if (uniform) {
              return `${uniform.id}`;
            }
            return match;
          }
          return `${parameter.functionId}`;
        });
      });

      const assignedVariableName = getAssignedVariableName(shaderVariableType);

      const functionInstantiation = assignedVariableName
        ? setUpFunctionInstantiation(
            assignedVariableName,
            functionName,
            functionParameters
          )
        : null;

      const shaderFunctionType = getShaderFunctionType(shaderVariableType);
      const shaderFunctionConfig = {
        id: functionName,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
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
