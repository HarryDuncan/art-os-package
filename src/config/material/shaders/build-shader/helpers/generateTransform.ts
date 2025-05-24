import {
  ParameterConfig,
  ShaderFunction,
  ShaderTransformationConfig,
  TransformationConfig,
} from "../buildShader.types";
import { FUNCTION_TYPES } from "../constants/buildShader.consts";
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
export const generateShaderTransformation = (
  config: ShaderTransformationConfig,
  effectProps: VertexEffectProps
): { transformation: string; transformationFunctions: ShaderFunction[] } => {
  const { id, effectParameters, effectType } = effectProps;

  const functionName = `${effectType}_${shaderSafeGuid(id)}`;

  const functionParameters = DEFAULT_VERTEX_PARAMETERS.map((effect) => ({
    ...effect,
    functionId: `${effect.id}_${shaderSafeGuid(id)}`,
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
  const functionInputs = functionParameters.map(({ functionId, valueType }) => {
    return `${shaderValueTypeInstantiation(valueType)} ${functionId}`;
  });

  const functionDeclaration = `vec4 ${functionName}(${functionInputs.join(
    ", "
  )}){`;

  const formattedFunctionContent = config.functionContent.map((line) => {
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

  const returnStatement = `return ${
    functionParameters.find((p) => p.id === "pointPosition")?.functionId ||
    "vec4(0.0)"
  };
  }`;

  console.log(functionDeclaration);
  console.log(formattedFunctionContent);
  console.log(returnStatement);

  // if parameters are just consts then add them
  const constantDeclarations = effectParameters
    .filter((p) => !p.isUniform && !p.isAttribute && !p.isVarying)
    .map((p) => {
      return `${shaderValueTypeInstantiation(p.valueType)} ${p.id} = ${
        p.value
      };`;
    });
  const functionInstantiation = `${VERTEX_POINT_NAME} = ${functionName}(${VERTEX_POINT_NAME}, ${functionParameters
    .flatMap((p) => {
      if (p.default) {
        return [];
      }
      return `${p.id}`;
    })
    .join(", ")});`;

  const transformation = [...constantDeclarations, functionInstantiation].join(
    "\n"
  );
  const transformationFunctions = [
    {
      id: functionName,
      functionDefinition: [
        functionDeclaration,
        ...formattedFunctionContent,
        returnStatement,
      ].join("\n"),
      functionType: FUNCTION_TYPES.ROOT,
    },
  ];
  return { transformation, transformationFunctions };
};
