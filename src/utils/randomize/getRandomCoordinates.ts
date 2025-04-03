import { Bounds3D } from "../../types/position.types";

export const getRandomCoordinates = (
  numberOfCoodinates: number,
  boundingBox: Bounds3D
) => {
  const {
    lowerBoundX,
    upperBoundX,
    lowerBoundY,
    upperBoundY,
    lowerBoundZ,
    upperBoundZ,
  } = boundingBox;

  // Check that the bounds are valid
  if (
    lowerBoundX >= upperBoundX ||
    lowerBoundY >= upperBoundY ||
    lowerBoundZ >= upperBoundZ
  ) {
    throw new Error(
      "Invalid bounds: the lower bound must be less than the upper bound for each dimension"
    );
  }

  // Generate the coordinates
  const coordinates: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < numberOfCoodinates; i += 1) {
    const x = Math.random() * (upperBoundX - lowerBoundX) + lowerBoundX;
    const y = Math.random() * (upperBoundY - lowerBoundY) + lowerBoundY;
    const z = Math.random() * (upperBoundZ - lowerBoundZ) + lowerBoundZ;
    coordinates.push({ x, y, z });
  }

  return coordinates;
};
