import { Vector3 } from "three";
import {
  position3dToVector,
  vectorToArray,
  vectorToPosition3d,
} from "../conversion";
import { expect, test, describe } from "vitest";

describe("conversion", () => {
  test("converts full position to vector3", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual({ x: 1, y: 2, z: 3 });
  });
  test("converts partial position to vector3 missing values are 0", () => {
    const coordinate = { x: 1, y: 2 };
    expect(position3dToVector(coordinate)).toEqual({ x: 1, y: 2, z: 0 });
  });
  test("converts vector3 into position", () => {
    const coordinate = new Vector3(1, 2, 3);
    expect(vectorToPosition3d(coordinate)).toEqual({ x: 1, y: 2, z: 3 });
  });
  test("converts position into array", () => {
    const coordinate = new Vector3(1, 2, 3);
    expect(vectorToArray(coordinate)).toEqual([1, 2, 3]);
  });
  test("converts partial position config to full position", () => {
    const coordinate = { x: 1, y: 2 };
    expect(position3dToVector(coordinate)).toEqual({ x: 1, y: 2, z: 0 });
  });
});
