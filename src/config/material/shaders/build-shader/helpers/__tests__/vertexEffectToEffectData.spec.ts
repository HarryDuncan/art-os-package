import { expect, test, describe } from "vitest";
import { vertexEffectToEffectData } from "../vertexEffectToEffectData";
import { EMPTY_UNIFORM_CONFIG } from "../../shader-properties/uniforms/uniforms.consts";

describe("vertexEffectToEffectData", () => {
  test("returns empty vertex effect when nothing is passed in", () => {
    const EMPTY_VERTEX_EFFECT = { pointName: "mock", transformation: "mock" };
    const vertexData = vertexEffectToEffectData(EMPTY_VERTEX_EFFECT);
    expect(vertexData.attributeConfig).toEqual([]);
    expect(vertexData.pointName).toEqual("mock");
    expect(vertexData.requiredFunctions).toEqual([]);
    expect(vertexData.transformation).toEqual("mock");
    expect(vertexData.uniformConfig).toEqual(EMPTY_UNIFORM_CONFIG);
    expect(vertexData.vertexPointInstantiation).toEqual(undefined);
    expect(vertexData.varyingConfig).toEqual([]);
  });

  test("returns vertex effect data when data is passed", () => {
    const EMPTY_VERTEX_EFFECT = {
      pointName: "mock",
      transformation: "mock",
      vertexPointInstantiation: "test",
    };
    const vertexData = vertexEffectToEffectData(EMPTY_VERTEX_EFFECT);
    expect(vertexData.attributeConfig).toEqual([]);
    expect(vertexData.pointName).toEqual("mock");
    expect(vertexData.requiredFunctions).toEqual([]);
    expect(vertexData.transformation).toEqual("mock");
    expect(vertexData.uniformConfig).toEqual(EMPTY_UNIFORM_CONFIG);
    expect(vertexData.vertexPointInstantiation).toEqual("test");
    expect(vertexData.varyingConfig).toEqual([]);
  });
});
