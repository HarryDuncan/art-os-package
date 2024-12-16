import { expect, test, describe } from "vitest";
import { ANIMATION_LOOP_TYPES } from "../../animationLoop.consts";
import { getLoopType } from "../getLoopTypes";
import { AnimationLoopType } from "../../animationloop.types";

const MOCK_START = 0;
const MOCK_MID = 50;
const MOCK_END = 100;
const MOCK_DURATION = 100;
describe("getLoopTypes", () => {
  test("returns a correct one to one function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ONE_TO_ONE as AnimationLoopType;
    const loopProps = {
      steepness: 2,
    };
    const loopFunction = getLoopType(loopType, MOCK_DURATION, loopProps);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(1);
    expect(midUniformValue).toEqual(0);
    expect(endUniformValue).toEqual(1);
  });
  test("returns a correct zero to one function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ZERO_TO_ONE;
    const loopProps = {
      steepness: 1,
    };
    const loopFunction = getLoopType(loopType, MOCK_DURATION, loopProps);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    // Have to pass just below duration
    const endUniformValue = loopFunction(99);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(0.5);
    expect(endUniformValue).toEqual(0.99);
  });

  test("returns a correct zero to zero function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ZERO_TO_ZERO;
    const loopProps = {
      steepness: 2,
    };
    const loopFunction = getLoopType(loopType, MOCK_DURATION, loopProps);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(1);
    expect(endUniformValue).toEqual(0);
  });

  test("returns a count function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.COUNT;
    const loopProps = {
      steepness: 2,
    };
    const defaultLoopFunction = getLoopType(loopType, MOCK_DURATION, loopProps);
    const defaultStartUniformValue = defaultLoopFunction(MOCK_START);
    const defaultMidUniformValue = defaultLoopFunction(MOCK_MID);
    const defaultEndUniformValue = defaultLoopFunction(MOCK_END);
    expect(defaultStartUniformValue).toEqual(0);
    expect(defaultMidUniformValue).toEqual(0);
    expect(defaultEndUniformValue).toEqual(0);
    const loopProps2 = {
      steepness: 2,
      loopLimit: 3,
    };

    const loopFunction = getLoopType(loopType, MOCK_DURATION, loopProps2);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID * 2);
    const endUniformValue = loopFunction(MOCK_END * 2);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(1);
    expect(endUniformValue).toEqual(2);
  });

  test("returns a correct linear function", () => {
    const loopType = ANIMATION_LOOP_TYPES.LINEAR;
    const loopFunction = getLoopType(loopType, MOCK_DURATION, {});
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(50);
    expect(endUniformValue).toEqual(100);
  });
});
