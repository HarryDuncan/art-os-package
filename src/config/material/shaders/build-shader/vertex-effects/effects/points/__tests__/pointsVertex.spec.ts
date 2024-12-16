import { expect, test, describe } from "vitest";
import { pointsVertex } from "../pointsVertex";

const MOCK_PERSPECTIVE = {
  floor: 10,
  ceiling: 18,
  scaleFactor: 16,
  divisor: 9,
};

const MOCK_POINT_NAME = "mockPoint";
describe("pointsVertex", () => {
  test("returns default (20.00) gl_PointSize if no effect props are passed", () => {
    const result = pointsVertex(MOCK_POINT_NAME, {});
    expect(result.transformation).toEqual("gl_PointSize = 20.00;");
  });
  test("returns default passed gl_PointSize from effect props", () => {
    const result = pointsVertex(MOCK_POINT_NAME, { pointSize: 40 });
    expect(result.transformation).toEqual("gl_PointSize = 40.00;");
  });
  test("returns gl_PointSize with perspective from effect props", () => {
    const result = pointsVertex(MOCK_POINT_NAME, {
      pointSize: 40,
      perspectiveConfig: MOCK_PERSPECTIVE,
    });
    expect(result.transformation).toEqual(
      "gl_PointSize = max(10.00, min(18.00, 16.00 *  (9.00 / mockPoint.z)));"
    );
  });
});
