import { expect, test, describe } from "vitest";
import { pointsPerspective } from "../pointsPerspective";

const MOCK_PERSPECTIVE = {
  floor: 10,
  ceiling: 18,
  scaleFactor: 16,
  divisor: 9,
};
const MOCK_POINT_NAME = "pointName";
describe("pointsPerspective", () => {
  test("returns empty string if no config has been passed", () => {
    const result = pointsPerspective(MOCK_POINT_NAME);
    expect(result).toEqual("");
  });
  test("returns gl point size string with minimum and maximum gl_Pointsize based on z index", () => {
    const result = pointsPerspective(MOCK_POINT_NAME, MOCK_PERSPECTIVE);
    expect(result).toEqual(
      `max(10.00, min(18.00, 16.00 *  (9.00 / pointName.z)))`
    );
  });
});
