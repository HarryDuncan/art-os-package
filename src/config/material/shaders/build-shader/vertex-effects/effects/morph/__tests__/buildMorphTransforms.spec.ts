import { expect, test, describe } from "vitest";
import { buildMorphTransforms } from "../buildMorphTransforms";

const MOCK_MORPH_TRANSFORMS = [
  { pointName: "morphPosition0", normalName: "morphNormal0" },
  { pointName: "morphPosition1", normalName: "morphNormal1" },
  {
    pointName: "transformTest2",
    normalName: "transformTest2",
  },
];
describe("buildMorphTransforms", () => {
  test("builds transforms for x items", () => {
    const result = buildMorphTransforms(MOCK_MORPH_TRANSFORMS, "test");
    expect(result).toContain("if(uLoopCount == 1){");
    expect(result).toContain("if(uLoopCount == 3){");
    expect(result).not.toContain("if(uLoopCount == 4){");
  });
  test("last transform goes back to first item", () => {
    const result = buildMorphTransforms(MOCK_MORPH_TRANSFORMS, "test");
    expect(result).toContain("effect_direction = test.xyz - currentPosition;");
    expect(result).toContain(
      "normal_effect_direction = normal - currentNormal;"
    );
  });
});
