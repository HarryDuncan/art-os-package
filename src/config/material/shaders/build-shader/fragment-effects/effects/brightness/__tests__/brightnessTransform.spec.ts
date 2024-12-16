import { expect, test, describe, vi } from "vitest";
import { brightnessTransform } from "../brightnessTransform";
import { DEFAULT_BRIGHTNESS_EFFECT_PARAMS } from "../brightness.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { BrightnessFragmentEffectProps } from "../../../../types";

const MOCK_FRAG_COLOR_NAME = "mockColor";
const MOCK_POINT = "mockPoint";

describe("brightnessTransformation", () => {
  test("returns default brightness transformation when default is passed - brightness set via uniform and instatation", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS,
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS
    );
    const { fragmentColorInstantiation, transformation } = brightnessTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      formattedEffectParams as BrightnessFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float brightness = uOpacity;`);
  });
  test("returns brightness at 0.5 transformation when nothing passed in effectProps", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS,
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
    };
    const { fragmentColorInstantiation, transformation } = brightnessTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as BrightnessFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float brightness = 0.5`);
  });
  test("returns seperate fragmentColorInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS,
      DEFAULT_BRIGHTNESS_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { fragmentColorInstantiation, transformation } = brightnessTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as BrightnessFragmentEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).not.toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(
      `vec4 brightnessColor = mockColor * uBrightness;`
    );
  });
});
