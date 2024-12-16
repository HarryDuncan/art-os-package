import { expect, test, describe } from "vitest";
import { imageVertexEffectTransform } from "../imageVertexEffectTransform";
import { ImageVertexEffect } from "../../../../types";
import { DEFAULT_IMAGE_VERTEX_EFFECT_PROPS } from "../imageVertexEffects.consts";

const MOCK_VERTEX_NAME = "mockVertexName";
const MOCK_POINT = "mockPoint";

describe("imageVertexTransform", () => {
  test("returns default image effect transformation when default is passed", () => {
    const formattedEffectParams = DEFAULT_IMAGE_VERTEX_EFFECT_PROPS;
    const {
      vertexPointInstantiation,
      transformation,
    } = imageVertexEffectTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      formattedEffectParams as ImageVertexEffect
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });

  test("returns separate vertexPointInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = DEFAULT_IMAGE_VERTEX_EFFECT_PROPS;
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const {
      vertexPointInstantiation,
      transformation,
    } = imageVertexEffectTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      effectParams as ImageVertexEffect
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).not.toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });
});
