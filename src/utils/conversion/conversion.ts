import { Vector2, Vector3, Vector4 } from "three";
import { PositionConfig } from "../three-dimension-space/position/position.types";

export const position3dToVector = (position: PositionConfig) => {
  const { x, y, z } = position;
  return new Vector3(x ?? 0, y ?? 0, z ?? 0);
};

export const vectorToPosition3d = (vector: Vector3) => ({
  x: vector.x,
  y: vector.y,
  z: vector.z,
});
export const vectorToArray = (vector: Vector3) => {
  const { x, y, z } = vector;
  return [x, y, z];
};
export const positionToArray = (position: PositionConfig): number[] =>
  Object.values(position).map((value) => value);

export const positionConfigToPosition = (positionConfig: PositionConfig) => {
  return {
    x: positionConfig.x ?? 0,
    y: positionConfig.y ?? 0,
    z: positionConfig.z ?? 0,
  };
};

export const arrayToVector = (numberArray: number[]) => {
  const arrayLength = numberArray.length;
  switch (arrayLength) {
    case 2:
      return new Vector2(numberArray[0], numberArray[1]);
    case 3:
      return new Vector3(numberArray[0], numberArray[1], numberArray[2]);
    case 4:
      return new Vector4(
        numberArray[0],
        numberArray[1],
        numberArray[2],
        numberArray[3]
      );
    default:
      console.warn(
        `${arrayLength} can not be matched to a vector size - returning a 2d vector`
      );
      return new Vector2(numberArray[0] ?? 0, numberArray[1] ?? 0);
  }
};
