import { expect, test, describe, vi } from "vitest";
import { flickerLoop } from "../flickerLoop";

const EMPTY_PROPS = {};
describe("flickerLoop", () => {
  test("returns a default flicker loop that flicks between a max state and min state", () => {
    const flickerLoopPropsWithParsed = flickerLoop(EMPTY_PROPS);
    expect(flickerLoopPropsWithParsed).toEqual({ flickerTimeAtMax: 0.2 });
  });
  test("returns a default flicker loop function with default props", () => {
    const flickerLoopPropsWithParsed = flickerLoop(EMPTY_PROPS);
    expect(flickerLoopPropsWithParsed).toEqual({ flickerTimeAtMax: 0.2 });
  });
  test("returns a default flicker loop function with flicker time set low - so it's in its minimum state more", () => {
    const flickerLoopFunction = flickerLoop({ flickerTimeAtMax: 0.2 });
    expect(flickerLoopFunction).toEqual();
  });
});
