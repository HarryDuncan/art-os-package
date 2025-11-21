import { SHADER_PROPERTY_VALUE_TYPES } from "../../../schema";

export const getDefaultValueAsString = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES
): string => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return `0.0`;
    case SHADER_PROPERTY_VALUE_TYPES.INT:
      return `0`;
    case SHADER_PROPERTY_VALUE_TYPES.BOOL:
      return `false`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return `vec2(0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return `vec3(0.0, 0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return `vec4(0.0, 0.0, 0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT2:
      return `mat2(1.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT3:
      return `mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT4:
      return `mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return `sampler2D`;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
      return `samplerCube`;
    default:
      return ``; // Handle unsupported types or VOID type here
  }
};

export const shaderValueTypeInstantiation = (valueType: string) => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return `float`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return `vec2`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return `vec3`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return `vec4`;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return `sampler2D`;
    default:
      throw new Error(`Unsupported value type: ${valueType}`);
  }
};

export const valueToShader = (valueType: string, value: unknown): string => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return !value || value === 0
        ? "0.0"
        : parseFloat(value as string).toFixed(1);
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      if (Array.isArray(value)) {
        return `vec2(${value[0]}, ${value[1]})`;
      }
      return `vec2(${value}, ${value})`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      if (!value) {
        return `vec3(0.0, 0.0, 0.0)`;
      }
      if (Array.isArray(value)) {
        return `vec3(${value[0] ?? 0.0}, ${value[1] ?? 0.0}, ${
          value[2] ?? 0.0
        })`;
      }
      return `vec3(${value ?? 0.0}, ${value ?? 0.0}, ${value ?? 0.0})`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      if (Array.isArray(value)) {
        return `vec4(${shaderSafeFloat(value[0])}, ${shaderSafeFloat(
          value[1]
        )}, ${shaderSafeFloat(value[2])}, ${shaderSafeFloat(value[3])})`;
      }
      return `vec4(${shaderSafeFloat(value as number)}, ${shaderSafeFloat(
        value as number
      )}, ${shaderSafeFloat(value as number)}, ${shaderSafeFloat(
        value as number
      )})`;
    default:
      throw new Error(`Unsupported value type: ${valueType}`);
  }
};

export const shaderSafeFloat = (value: number) => {
  return value.toFixed(2);
};
