import { PositionConfig } from "../../../../../types";
import { positionConfigToPosition } from "../../../../../utils/conversion/conversion";
import { SHADER_PROPERTY_VALUE_TYPES } from "../constants/shader.consts";

export const safeParseValue = (
  id: string,
  valueType: string,
  instantiationType: string
): string => {
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

export const parseRawValueToShader = (
  valueType: string,
  value: any
): string => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return !value || value === 0 ? "0.0" : parseFloat(value).toFixed(1);
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      if (Array.isArray(value)) {
        return `vec2(${value[0]}, ${value[1]})`;
      }
      return `vec2(${value}, ${value})`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      if (Array.isArray(value)) {
        return `vec3(${value[0]}, ${value[1]}, ${value[2]})`;
      }
      return `vec3(${value}, ${value}, ${value})`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      if (Array.isArray(value)) {
        return `vec4(${shaderSafeFloat(value[0])}, ${shaderSafeFloat(
          value[1]
        )}, ${shaderSafeFloat(value[2])}, ${shaderSafeFloat(value[3])})`;
      }
      return `vec4(${shaderSafeFloat(value)}, ${shaderSafeFloat(
        value
      )}, ${shaderSafeFloat(value)}, ${shaderSafeFloat(value)})`;
    default:
      throw new Error(`Unsupported value type: ${valueType}`);
  }
};

export const shaderSafeFloat = (value: number) => {
  return value.toFixed(2);
};

export const shaderSafeVector = (position: PositionConfig) => {
  const formattedPositon = positionConfigToPosition(position);
  return `vec3(${shaderSafeFloat(formattedPositon.x)}, ${shaderSafeFloat(
    formattedPositon.y
  )}, ${shaderSafeFloat(formattedPositon.z)})`;
};

export const shaderSafeVector4 = (
  position: PositionConfig,
  fourthElement: number | string = 1
) => {
  const formattedPositon = positionConfigToPosition(position);
  return `vec4(${shaderSafeFloat(formattedPositon.x)}, ${shaderSafeFloat(
    formattedPositon.y
  )}, ${shaderSafeFloat(formattedPositon.z)}, ${
    isVariableName(fourthElement)
      ? fourthElement
      : shaderSafeFloat(Number(fourthElement))
  })`;
};

const isVariableName = (value: number | string) => Number.isNaN(Number(value));
