import { xyzToArray } from "../xyzToArray";

describe("coordinateObjectToArray", () => {
  test("should convert an XYZ coordinate object to an array of numbers", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(xyzToArray(coordinate)).toEqual([1, 2, 3]);
  });
});
