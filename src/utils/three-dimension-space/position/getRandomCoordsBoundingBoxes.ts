import { BoundingBox, Position3d } from "./../../../types/position.types";

export const getRandomCoordinatesInBoundingBoxes = (
  boundingBoxes: BoundingBox[],
  excludingBoxes: BoundingBox[],
  numberOfCoordinates: number
): Position3d[] => {
  const coordinates: Position3d[] = [];
  while (coordinates.length < numberOfCoordinates) {
    const boundingBox =
      boundingBoxes[Math.floor(Math.random() * boundingBoxes.length)];
    const coordinate = {
      x:
        Math.random() * (boundingBox.max.x - boundingBox.min.x) +
        boundingBox.min.x,
      y:
        Math.random() * (boundingBox.max.y - boundingBox.min.y) +
        boundingBox.min.y,
      z:
        Math.random() * (boundingBox.max.z - boundingBox.min.z) +
        boundingBox.min.z,
    };
    let isExcluded = false;
    excludingBoxes.forEach((excludingBox) => {
      if (
        coordinate.x > excludingBox.min.x &&
        coordinate.x < excludingBox.max.x &&
        coordinate.y > excludingBox.min.y &&
        coordinate.y < excludingBox.max.y &&
        coordinate.z > excludingBox.min.z &&
        coordinate.z < excludingBox.max.z
      ) {
        isExcluded = true;
      }
    });

    if (!isExcluded) {
      coordinates.push(coordinate);
    }
  }
  return coordinates;
};
