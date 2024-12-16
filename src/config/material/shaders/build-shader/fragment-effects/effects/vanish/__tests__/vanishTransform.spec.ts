import { expect, test, describe } from "vitest";
import { vanishTransform } from "../vanishTransform";
import { DEFAULT_VANISH_EFFECT_PARAMS } from "../vanish.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { OpacityFragmentEffectProps } from "../../../../types";

const MOCK_FRAG_COLOR_NAME = "mockColor";
const MOCK_POINT = "mockPoint";

describe("vanishTransformation", () => {
  test("returns default vanish transformation when default is passed - vanish set via uniform and instatation", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_VANISH_EFFECT_PARAMS,
      DEFAULT_VANISH_EFFECT_PARAMS
    );
    const { fragmentColorInstantiation, transformation } = vanishTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      formattedEffectParams as OpacityFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`vec4 mockColor = mockPoint;`);
  });

  test("returns seperate fragmentColorInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_VANISH_EFFECT_PARAMS,
      DEFAULT_VANISH_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { fragmentColorInstantiation, transformation } = vanishTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as OpacityFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).not.toContain(`vec4 mockColor = mockPoint;`);
  });
});
