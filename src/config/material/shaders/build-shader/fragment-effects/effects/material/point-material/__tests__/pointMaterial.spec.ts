import { expect, test, describe, vi } from "vitest";
import {
  POINT_MATERIAL_FUNCTIONS,
  POINT_MATERIAL_VARYINGS,
  POINT_MATERIAL_ATTRIBUTES,
  POINT_MATERIAL_UNIFORMS,
} from "../pointMaterial.consts";
import { pointMaterial } from "../pointMaterial";
import { FRAGMENT_COLOR_NAMES } from "../../../../fragmentEffects.consts";

vi.mock("../pointMaterialTransform", () => ({
  pointMaterialTransform: () => ({
    uniformConfig: POINT_MATERIAL_UNIFORMS,
    requiredFunctions: POINT_MATERIAL_FUNCTIONS,
    transform: "point transform",
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
      fragName: FRAGMENT_COLOR_NAMES.POINT_MATERIAL,
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = pointMaterial(MOCK_FRAG, { pointParent: "TRIGGERED" });
    expect(fragData.fragName).toContain(
      `${FRAGMENT_COLOR_NAMES.POINT_MATERIAL}_TRIGGERED`
    );
  });
});
