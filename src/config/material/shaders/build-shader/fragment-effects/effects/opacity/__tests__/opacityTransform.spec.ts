import { expect, test, describe, vi } from "vitest";
import { opacityTransform } from "../opacityTransform";
import { DEFAULT_OPACITY_EFFECT_PARAMS } from "../opacity.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { OpacityFragmentEffectProps } from "../../../../types";

const MOCK_FRAG_COLOR_NAME = "mockColor";
const MOCK_POINT = "mockPoint";

describe("opacityTransformation", () => {
  test("returns default opacity transformation when default is passed - opacity set via uniform and instatation", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_OPACITY_EFFECT_PARAMS,
      DEFAULT_OPACITY_EFFECT_PARAMS
    );
    const { fragmentColorInstantiation, transformation } = opacityTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      formattedEffectParams as OpacityFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float opacity = uOpacity;`);
  });
  test("returns opacity at 0.5 transformation when nothing passed in effectProps", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_OPACITY_EFFECT_PARAMS,
      DEFAULT_OPACITY_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      asUniform: false,
      opacity: 0.5,
    };
    const { fragmentColorInstantiation, transformation } = opacityTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as OpacityFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float opacity = 0.5`);
  });
  test("returns seperate fragmentColorInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_OPACITY_EFFECT_PARAMS,
      DEFAULT_OPACITY_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { fragmentColorInstantiation, transformation } = opacityTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as OpacityFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).not.toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float opacity = uOpacity;`);
  });
});
