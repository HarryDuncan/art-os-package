import { expect, test, describe, vi } from "vitest";
import {
  ROTATION_ATTRIBUTES,
  ROTATION_FUNCTIONS,
  ROTATION_UNIFORMS,
  ROTATION_VARYINGS,
} from "../rotation.consts";
import { rotationEffect } from "../rotation";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";

vi.mock("../rotationTransform", () => ({
  rotationTransform: () => ({
    uniformConfig: ROTATION_UNIFORMS,
    requiredFunctions: ROTATION_FUNCTIONS,
    transformation: "rotation transform",
    vertexPointInstantiation: "rotationVertex",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("rotationEffect", () => {
  test("returns default rotation transformation when nothing is passed", () => {
    const vertexData = rotationEffect(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: ROTATION_FUNCTIONS,
      uniformConfig: ROTATION_UNIFORMS,
      transformation: "rotation transform",
      varyingConfig: ROTATION_VARYINGS,
      attributeConfig: ROTATION_ATTRIBUTES,
      pointName: VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT,
      vertexPointInstantiation: "rotationVertex",
    };
    expect(vertexData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const vertexData = rotationEffect(MOCK_POINT, { pointParent: "TRIGGERED" });
    expect(vertexData.pointName).toContain(
      `${VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT}_TRIGGERED`
    );
  });
});
