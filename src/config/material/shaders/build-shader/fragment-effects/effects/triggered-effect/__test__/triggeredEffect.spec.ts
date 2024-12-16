import { expect, test, describe, vi } from "vitest";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { triggeredEffect } from "../triggeredEffect";
import {
  TRIGGERED_ATTRIBUTE_CONFIGS,
  TRIGGERED_FUNCTIONS,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "../triggeredEffect.consts";
import { EMPTY_UNIFORM_CONFIG } from "../../../../shader-properties/uniforms/uniforms.consts";

vi.mock("../triggeredEffectTransform", () => ({
  triggeredEffectTransform: () => ({
    transformation: "triggeredEffect",
    fragmentColorInstantiation: "instantiate",
    effectUniforms: EMPTY_UNIFORM_CONFIG,
    fragEffectName: "triggeredEffectName",
    effectVaryings: [],
    effectFunctions: [],
    effectAttributes: [],
  }),
}));

const MOCK_POINT = "mockPoint";

describe("triggeredEffectTransform", () => {
  test("returns default triggered when nothing is passed", () => {
    const fragData = triggeredEffect(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: TRIGGERED_FUNCTIONS,
      uniformConfig: TRIGGERED_UNIFORM_CONFIG,
      transformation: "triggeredEffect",
      varyingConfig: TRIGGERED_VARYING_CONFIG,
      attributeConfig: TRIGGERED_ATTRIBUTE_CONFIGS,
      fragName: "triggeredEffectName",
      fragmentColorInstantiation: "instantiate",
    };
    expect(fragData).toEqual(expectedResult);
  });
});
