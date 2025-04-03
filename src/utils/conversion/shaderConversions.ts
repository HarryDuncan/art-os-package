import { PositionConfig } from "../../types/position.types";
import { positionConfigToPosition } from "./conversion";

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
