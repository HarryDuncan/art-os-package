import { expect, test, describe, vi } from "vitest";
import {
  DEFAULT_DISTORT_ATTRIBUTES,
  DEFAULT_DISTORT_FUNCTIONS,
  DEFAULT_DISTORT_UNIFORMS,
  DEFAULT_DISTORT_VARYINGS,
} from "../distortion.defaults";
import { distortionEffect } from "../distortionEffect";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../../vertexEffects.consts";

vi.mock("../distortionTransform", () => ({
  distortionTransform: () => ({
    uniformConfig: DEFAULT_DISTORT_UNIFORMS,
    requiredFunctions: DEFAULT_DISTORT_FUNCTIONS,
    transformation: "distort transform",
    vertexPointInstantiation: "distortVertex",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("distortionEffect", () => {
  test("returns default vertex distortionEffect transformation - which is twister", () => {
    const vertexData = distortionEffect(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: DEFAULT_DISTORT_FUNCTIONS,
      uniformConfig: DEFAULT_DISTORT_UNIFORMS,
      transformation: "distort transform",
      varyingConfig: DEFAULT_DISTORT_VARYINGS,
      attributeConfig: DEFAULT_DISTORT_ATTRIBUTES,
      pointName: VERTEX_EFFECT_POINT_NAMES.DISTORT_POINT,
      vertexPointInstantiation: "distortVertex",
    };
    expect(vertexData).toEqual(expectedResult);
  });
});
