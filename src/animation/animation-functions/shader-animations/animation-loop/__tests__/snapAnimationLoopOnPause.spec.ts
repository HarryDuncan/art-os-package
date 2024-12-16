import { ANIMATION_LOOP_TYPES } from "../animationLoop.consts";
import { snapAnimationLoopOnPause } from "../snapAnimationLoopOnPause";
import { expect, test, describe } from "vitest";

const MOCK = [
  {
    uniform: "uZeroToOne",
    loopType: ANIMATION_LOOP_TYPES.ZERO_TO_ONE,
  },
  {
    uniform: "uOneToOne",
    loopType: ANIMATION_LOOP_TYPES.ONE_TO_ONE,
  },
  {
    uniform: "uZeroToZero",
    loopType: ANIMATION_LOOP_TYPES.ZERO_TO_ZERO,
  },
  {
    uniform: "uLinear",
    loopType: ANIMATION_LOOP_TYPES.LINEAR,
  },
  {
    uniform: "uLoopCount",
    loopType: ANIMATION_LOOP_TYPES.COUNT,
  },
  {
    uniform: "uTestMaterial",
    loopType: ANIMATION_LOOP_TYPES.ONE_TO_ONE,
    toMaterial: "test",
  },
  {
    uniform: "uTestMaterial2",
    loopType: ANIMATION_LOOP_TYPES.ZERO_TO_ZERO,
    toMaterial: "test-2",
  },
];
const mockObject = {
  material: {
    name: "",
    uniforms: {
      uTime: {
        value: 0,
      },
      uZeroToOne: {
        value: 1.0,
      },
      uOneToOne: {
        value: 0.0,
      },
      uZeroToZero: {
        value: 0.0,
      },
      uLinear: {
        value: 199.0,
      },
      uLoopCount: {
        value: 5,
      },
      uTestMaterial: {
        value: 0.5,
      },
      uTestMaterial2: {
        value: 0.5,
      },
    },
  },
};

describe("snapAnimationLoopOnPause", () => {
  test("snaps animation to end of zero to one loop", () => {
    const shaderObject = { ...mockObject };
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uZeroToOne.value).toEqual(1);
  });
  test("snaps animation to end of one to one loop", () => {
    const shaderObject = { ...mockObject };
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uOneToOne.value).toEqual(1);
  });
  test("correctly snaps uniformValue to end of zero to zero loop", () => {
    const shaderObject = { ...mockObject };
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uZeroToZero.value).toEqual(0);
  });
  test("doesnt reset loop counts", () => {
    const shaderObject = { ...mockObject };
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uLoopCount.value).toEqual(5);
  });
  test("doesnt snap linear functions", () => {
    const shaderObject = { ...mockObject };
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uLinear.value).toEqual(199.0);
  });
  test("doesnt snap functions if toMaterial isn't matching the objects material name", () => {
    const shaderObject = { ...mockObject };
    mockObject.material.name = "test";
    snapAnimationLoopOnPause(MOCK, shaderObject);
    expect(shaderObject.material.uniforms.uTestMaterial.value).toEqual(1);
    expect(shaderObject.material.uniforms.uTestMaterial2.value).toEqual(0.5);
  });
});
