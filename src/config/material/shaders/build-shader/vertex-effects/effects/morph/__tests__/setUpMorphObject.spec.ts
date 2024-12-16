import { test, describe } from "vitest";
import { setUpMorphObjects } from "../setUpMorphObjects";
import { TransformTypes } from "../../../vertexEffects.consts";

const TRANSLATE_MOCK = [
  {
    index: 2,
    pointName: "test",
    transformType: TransformTypes.TRANSLATE,
    transformProps: { translate: { z: 10 } },
  },
];

describe("setUpMorphObjects", () => {
  test("sets up morph objects for x items", () => {
    const result = setUpMorphObjects(2, []);
    expect(result.morphObjects).toEqual([
      { pointName: "morphPosition0", normalName: "morphNormal0" },
      { pointName: "morphPosition1", normalName: "morphNormal1" },
    ]);
  });
  test("sets up morph objects for x items and merges pretransform data", () => {
    const result = setUpMorphObjects(3, TRANSLATE_MOCK);
    expect(result.morphObjects).toEqual([
      { pointName: "morphPosition0", normalName: "morphNormal0" },
      { pointName: "morphPosition1", normalName: "morphNormal1" },
      {
        pointName: "transformTest2",
        normalName: "morphNormal2",
      },
    ]);
  });
});
