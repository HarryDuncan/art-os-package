import { expect, test, describe, vi } from "vitest";
import { vanishEffect } from "../vanish";
import {
  VANISH_ATTRIBUTES,
  VANISH_FUNCTIONS,
  VANISH_UNIFORMS,
  VANISH_VARYINGS,
} from "../vanish.consts";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";

vi.mock("../vanishTransform", () => ({
  vanishTransform: () => ({
    transformation: "vanishTransformationString;",
    fragmentColorInstantiation: "instantiate",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("vanishEffect", () => {
  test("returns default vanish transformation when nothing is passed", () => {
    const fragData = vanishEffect(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: VANISH_FUNCTIONS,
      uniformConfig: VANISH_UNIFORMS,
      transformation: "vanishTransformationString;",
      varyingConfig: VANISH_VARYINGS,
      attributeConfig: VANISH_ATTRIBUTES,
      fragName: FRAGMENT_COLOR_NAMES.VANISH,
      fragmentColorInstantiation: "instantiate",
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = vanishEffect(MOCK_POINT, { pointParent: "TRIGGERED" });
    expect(fragData.fragName).toContain(
      `${FRAGMENT_COLOR_NAMES.VANISH}_TRIGGERED`
    );
  });
});
