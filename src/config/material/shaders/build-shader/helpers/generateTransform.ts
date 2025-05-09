import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../consts";
import {
  UniformValueConfig,
  VertexTransformationConfig,
} from "../../../../../types";

export const generateVertexTransformation = (
  config: VertexTransformationConfig,
  uniforms: UniformValueConfig[]
) => {
  let transformation = config.prefix ?? "";
  const allowedUniforms = uniforms.filter((uniform) =>
    (config.allowedValueTypes as unknown as string[]).includes(
      uniform.valueType
    )
  );

  if (config.singleInstance) {
    config.effectCode.forEach((line: string) => {
      let processedLine = line;

      transformation += processedLine + "\n";
    });
  } else {
    allowedUniforms.forEach((uniform, index) => {
      // Add instantiation
      transformation += `${valueTypeToValue(
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

function safeParseValue(
  id: string,
  valueType: string,
  instantiationType: string
): string {
  if (instantiationType === SHADER_PROPERTY_VALUE_TYPES.VEC3) {
    switch (valueType) {
      case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
        return `vec3(${id},${id},${id})`;
      case SHADER_PROPERTY_VALUE_TYPES.VEC2:
        return `vec3(${id}, 0.0)`;
      case SHADER_PROPERTY_VALUE_TYPES.VEC3:
        return `vec3(${id})`;
      case SHADER_PROPERTY_VALUE_TYPES.VEC4:
        return `vec3(${id}.xyz)`;
      default:
        throw new Error(`Unsupported value type: ${valueType}`);
    }
  }
  console.warn(
    `No safe parse value for ${valueType} and ${instantiationType} has been configured`
  );
  return "";
}

const valueTypeToValue = (valueType: string) => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return `float`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return `vec2`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return `vec3`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return `vec4`;
    default:
      throw new Error(`Unsupported value type: ${valueType}`);
  }
};
