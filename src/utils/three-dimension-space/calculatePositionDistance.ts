import { Position3d } from "./../../types/position.types";

export const calculatePositionDistance = (
  position1: Position3d,
  position2: Position3d
) => {
  const x = position1.x - position2.x;
  const y = position1.y - position2.y;
  const z = position1.z - position2.z;
  return { x, y, z };
};
