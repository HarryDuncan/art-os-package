import { expect, test, describe, vi } from "vitest";
import {
  POINT_MATERIAL_FUNCTIONS,
  POINT_MATERIAL_VARYINGS,
  POINT_MATERIAL_ATTRIBUTES,
} from "../pointMaterial.consts";
import { pointMaterial } from "../pointMaterial";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../../../vertex-effects/vertexEffects.consts";

vi.mock("../pointMaterialTransform", () => ({
  pointMaterialTransform: () => ({
    uniformConfig: POINT_MATERIAL_UNIFORMS,
    requiredFunctions: POINT_MATERIAL_FUNCTIONS,
    transformation: "point transform",
  }),
}));

const MOCK_FRAG = "mockFRAG";
describe("pointMaterialEffect", () => {
  test("returns default point material transformation when nothing is passed", () => {
    const fragData = pointMaterial(MOCK_FRAG, {});
    const expectedResult = {
      requiredFunctions: POINT_MATERIAL_FUNCTIONS,
      uniformConfig: POINT_MATERIAL_UNIFORMS,
      transformation: "point transform",
      varyingConfig: POINT_MATERIAL_VARYINGS,
      attributeConfig: POINT_MATERIAL_ATTRIBUTES,
      fragName: VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT,
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = pointMaterial(MOCK_FRAG, { pointParent: "TRIGGERED" });
    expect(fragData.fragName).toContain(
      `${VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT}_TRIGGERED`
    );
  });
});
