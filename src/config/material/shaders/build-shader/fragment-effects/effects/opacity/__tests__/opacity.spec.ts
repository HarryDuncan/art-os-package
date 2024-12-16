import { expect, test, describe, vi } from "vitest";
import { opacity } from "../opacity";
import {
  OPACITY_ATTRIBUTES,
  OPACITY_FUNCTIONS,
  OPACITY_UNIFORMS,
  OPACITY_VARYINGS,
} from "../opacity.consts";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";

vi.mock("../opacityTransform", () => ({
  opacityTransform: () => ({
    transformation: "explodeTransformationString;",
    fragmentColorInstantiation: "instantiate",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("opacityTransformations", () => {
  test("returns default opacity transformation when nothing is passed", () => {
    const fragData = opacity(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: OPACITY_FUNCTIONS,
      uniformConfig: OPACITY_UNIFORMS,
      transformation: "explodeTransformationString;",
      varyingConfig: OPACITY_VARYINGS,
      attributeConfig: OPACITY_ATTRIBUTES,
      fragName: FRAGMENT_COLOR_NAMES.OPACITY,
      fragmentColorInstantiation: "instantiate",
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = opacity(MOCK_POINT, { pointParent: "TRIGGERED" });

    expect(fragData.fragName).toContain(
      `${FRAGMENT_COLOR_NAMES.OPACITY}_TRIGGERED`
    );
  });
});
