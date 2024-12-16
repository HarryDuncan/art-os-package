import { expect, test, describe, vi } from "vitest";
import { incrementLoop } from "../incrementLoop";
import { DEFAULT_DURATION_SECONDS } from "../../../animationLoop.consts";

describe("incrementLoop", () => {
  test("returns a default increment loop with a 50% overlap then return to normal", () => {
    const EMPTY_PROPS = {};
    const incrementLoopFunction = incrementLoop(
      DEFAULT_DURATION_SECONDS,
      EMPTY_PROPS
    );
    const resultStart = incrementLoopFunction(0);
    const resultMid = incrementLoopFunction(DEFAULT_DURATION_SECONDS / 2);
    const resultNearEnd = incrementLoopFunction(
      DEFAULT_DURATION_SECONDS * 0.75
    );
    const resultEnd = incrementLoopFunction(DEFAULT_DURATION_SECONDS);

    expect(resultStart).toEqual(0);
    expect(resultMid).toEqual(1.5);
    expect(resultNearEnd).toEqual(1.0606601717798214);
    expect(resultEnd).toEqual(1);
  });
});
