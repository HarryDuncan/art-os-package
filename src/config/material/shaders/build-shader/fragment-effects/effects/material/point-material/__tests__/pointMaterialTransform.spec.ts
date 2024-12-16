import { expect, test, describe, vi } from "vitest";
import { formatFragmentParameters } from "../../../../../helpers/formatFragmentParameters";
import { DEFAULT_POINT_MATERIAL_PROPS } from "../pointMaterial.consts";
import { pointMaterialTransform } from "../pointMaterialTransform";
import { PointColorFragmentEffectProps } from "../../../../../types";

const MOCK_FRAG_COLOR_NAME = "mockColor";
const MOCK_POINT = "mockPoint";

describe("pointMaterialTransformation", () => {
  test("returns default point material when default is passed", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_POINT_MATERIAL_PROPS,
      DEFAULT_POINT_MATERIAL_PROPS
    );
    const { transform } = pointMaterialTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      formattedEffectParams as PointColorFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float opacity = uOpacity;`);
  });
});
