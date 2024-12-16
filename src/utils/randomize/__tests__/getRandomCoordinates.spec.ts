import { getRandomCoordinates } from "../getRandomCoordinates";
import { expect, test, describe } from "vitest";

describe("getRandomXYZCoordinates", () => {
  test("should generate the specified number of random XYZ coordinates within the given bounds", () => {
    const lowerBoundX = 0;
    const upperBoundX = 10;
    const lowerBoundY = 0;
    const upperBoundY = 10;
    const lowerBoundZ = 0;
    const upperBoundZ = 10;
    const coordinates = getRandomCoordinates(10, {
      lowerBoundX,
      upperBoundX,
      lowerBoundY,
      upperBoundY,
      lowerBoundZ,
      upperBoundZ,
    });
    expect(coordinates.length).toBe(10);
    coordinates.forEach((coordinate) => {
      expect(coordinate.x).toBeGreaterThanOrEqual(lowerBoundX);
      expect(coordinate.x).toBeLessThanOrEqual(upperBoundX);
      expect(coordinate.y).toBeGreaterThanOrEqual(lowerBoundY);
      expect(coordinate.y).toBeLessThanOrEqual(upperBoundY);
      expect(coordinate.z).toBeGreaterThanOrEqual(lowerBoundZ);
      expect(coordinate.z).toBeLessThanOrEqual(upperBoundZ);
    });
  });

  test("should throw an error if the lower bounds are greater than or equal to the upper bounds for any dimension", () => {
    expect(() => {
      const erroredBounds = {
        lowerBoundX: 10,
        upperBoundX: 0,
        lowerBoundY: 0,
        upperBoundY: 10,
        lowerBoundZ: 0,
        upperBoundZ: 10,
      };
      getRandomCoordinates(10, erroredBounds);
    }).toThrowError(
      "Invalid bounds: the lower bound must be less than the upper bound for each dimension"
    );
  });
});
