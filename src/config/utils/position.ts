import { Position3d } from "utils/three-dimension-space/position/position.types";

export const getPosition = (positionConfig: Partial<Position3d>) => {
  return {
    x: positionConfig.x ?? 0,
    y: positionConfig.y ?? 0,
    z: positionConfig.z ?? 0,
  };
};
