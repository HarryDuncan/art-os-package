import { expect, test, describe, vi } from "vitest";
import { formatLoopPropsWithDefault } from "../formatLoopPropsWithDefault";
import { DEFAULT_FLICKER_LOOP_PROPS } from "../../loops/flicker-loop/flickerLoop.consts";
import { FlickerLoopProps } from "../../animationloop.types";

const EMPTY_PROPS = {};
describe("formatLoopPropsWithDefault", () => {
  test("correctly formats parsed flicker loop props with default ones", () => {
    const flickerLoopProps = formatLoopPropsWithDefault(
      DEFAULT_FLICKER_LOOP_PROPS,
      EMPTY_PROPS as Partial<FlickerLoopProps>
    );
    expect(flickerLoopProps).toEqual(DEFAULT_FLICKER_LOOP_PROPS);

    const parsed = { flickerTimeAtMax: 0.2 };
    const flickerLoopPropsWithParsed = formatLoopPropsWithDefault(
      DEFAULT_FLICKER_LOOP_PROPS,
      parsed
    );
    expect(flickerLoopPropsWithParsed).toEqual({ flickerTimeAtMax: 0.2 });
  });
});
