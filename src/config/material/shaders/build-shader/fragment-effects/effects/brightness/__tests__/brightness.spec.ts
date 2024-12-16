import { expect, test, describe, vi } from "vitest";
import { brightness } from "../brightness";
import {
  BRIGHTNESS_ATTRIBUTES,
  BRIGHTNESS_FUNCTIONS,
  BRIGHTNESS_UNIFORMS,
  BRIGHTNESS_VARYINGS,
} from "../brightness.consts";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";

vi.mock("../brightnessTransform", () => ({
  brightnessTransform: () => ({
    transformation: "explodeTransformationString;",
    fragmentColorInstantiation: "instantiate",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("brightnessTransformations", () => {
  test("returns default brightness transformation when nothing is passed", () => {
    const fragData = brightness(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: BRIGHTNESS_FUNCTIONS,
      uniformConfig: BRIGHTNESS_UNIFORMS,
      transformation: "explodeTransformationString;",
      varyingConfig: BRIGHTNESS_VARYINGS,
      attributeConfig: BRIGHTNESS_ATTRIBUTES,
      fragName: FRAGMENT_COLOR_NAMES.BRIGHTNESS,
      fragmentColorInstantiation: "instantiate",
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = brightness(MOCK_POINT, { pointParent: "TRIGGERED" });

    expect(fragData.fragName).toContain(
      `${FRAGMENT_COLOR_NAMES.BRIGHTNESS}_TRIGGERED`
    );
  });
});
