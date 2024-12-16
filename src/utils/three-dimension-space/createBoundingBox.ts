import { BoundingBox, Position3d } from "./position/position.types";

export const createBoundingBox = ({
  center,
  width,
  height,
  depth,
}: {
  center: Partial<Position3d>;
  width: number;
  height: number;
  depth: number;
}): BoundingBox => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;
  const bboxCenter = {
    x: center.x ?? 0,
    y: center.y ?? 0,
    z: center.z ?? 0,
  };
  return {
    min: {
      x: bboxCenter.x - halfWidth,
      y: bboxCenter.y - halfHeight,
      z: bboxCenter.z - halfDepth,
    },
    max: {
      x: bboxCenter.x + halfWidth,
      y: bboxCenter.y + halfHeight,
      z: bboxCenter.z + halfDepth,
    },
  };
};
