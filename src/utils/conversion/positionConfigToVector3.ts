import { Vector3 } from "three";
import { PositionConfig } from "../three-dimension-space/position/position.types";

export const positionConfigToVector3 = (position: PositionConfig) => {
  const { x, y, z } = position;
  return new Vector3(x ?? 0, y ?? 0, z ?? 0);
};
