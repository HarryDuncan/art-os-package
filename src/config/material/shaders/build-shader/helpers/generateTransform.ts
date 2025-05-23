import {
  ParameterConfig,
  ShaderTransformationConfig,
  TransformationConfig,
} from "../buildShader.types";
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

const DEFAULT_VERTEX_PARAMETERS = [
  {
    id: "pointPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  },
];
export const generateShaderTransformation = (
  config: ShaderTransformationConfig,
  effectProps: VertexEffectProps
) => {
  const { id, effectParameters, effectType } = effectProps;

  const functionName = `${effectType}_${id}`;
  const functionParameters = DEFAULT_VERTEX_PARAMETERS.map((effect) => ({
    id: effect.id,
    valueType: effect.valueType,
    functionId: `${effect.id}_${id}`,
  })).concat(
    effectParameters.map((effectParameter) => {
      const { id: parameterId, guid } = effectParameter;
      return {
        id: parameterId,
        valueType: effectParameter.valueType,
        functionId: `${parameterId}_${guid}`,
      };
    })
  );
  const functionInputs = functionParameters.map(({ functionId, valueType }) => {
    return `${shaderValueTypeInstantiation(valueType)} ${functionId}`;
  });

  const functionDeclaration = `vec4 ${functionName}(${functionInputs.join(
    ", "
  )})`;

  const formattedFunctionContent = config.functionContent.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      const parameter = functionParameters.find((p) => p.id === key);

      if (!parameter) {
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
    .filter((p) => !p.isUniform && !p.isAttribute)
    .map((p) => {
      return `${shaderValueTypeInstantiation(p.valueType)} ${p.id} = ${
        p.value
      };`;
    });
  console.log(constantDeclarations);
  const functionInstantiation = `${VERTEX_POINT_NAME} = ${functionName}(${VERTEX_POINT_NAME}, ${functionParameters
    .map((p) => {
      return `${p.id}`;
    })
    .join(", ")});`;

  const transform = [
    functionDeclaration,
    ...formattedFunctionContent,
    returnStatement,
    ...constantDeclarations,
    functionInstantiation,
  ].join("\n");
  return transform;
};
