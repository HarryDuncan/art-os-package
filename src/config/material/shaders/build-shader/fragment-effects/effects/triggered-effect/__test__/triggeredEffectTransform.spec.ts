import { expect, test, describe, vi } from "vitest";
import { DEFAULT_TRIGGERED_EFFECT } from "../triggeredEffect.consts";
import { triggeredEffectTransform } from "../triggeredEffectTransform";
import { EMPTY_UNIFORM_CONFIG } from "../../../../shader-properties/uniforms/uniforms.consts";

const MOCK_POINT = "mockPoint";
const PREVIOUS_FRAG_NAME = "previousPoint";

describe("triggeredEffectTransform", () => {
  test("returns default triggered when nothing is passed - empty", () => {
    const fragData = triggeredEffectTransform(
      MOCK_POINT,
      PREVIOUS_FRAG_NAME,
      DEFAULT_TRIGGERED_EFFECT
    );
    const expectedResult = {
      effectUniforms: EMPTY_UNIFORM_CONFIG,
      effectVaryings: [],
      effectFunctions: [],
      transformation: "",
      effectAttributes: [],
      fragEffectName: MOCK_POINT,
      fragmentColorInstantiation: `vec4 ${MOCK_POINT} = vec4(1.0,0,0,1.0);`,
    };
    expect(fragData.effectUniforms).toEqual(expectedResult.effectUniforms);
    expect(fragData.effectVaryings).toEqual(expectedResult.effectVaryings);
    expect(fragData.effectFunctions).toEqual(expectedResult.effectFunctions);
    expect(fragData.effectAttributes).toEqual(expectedResult.effectAttributes);
    expect(fragData.fragEffectName).toEqual(expectedResult.fragEffectName);
    expect(fragData.fragmentColorInstantiation).toEqual(
      expectedResult.fragmentColorInstantiation
    );
    expect(fragData.transformation).toContain(
      expectedResult.fragmentColorInstantiation
    );
    expect(fragData.transformation).toContain(`if(uIsTriggered >= 1.0){`);
  });
});
