import { expect, test, describe } from "vitest";
import { DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS } from "../imageToPoints.consts";
import { imageToPointsTransform } from "../imageToPointsTransform";
import { ImageToPointsEffectProps } from "config/material/shaders/build-shader/types";

const MOCK_VERTEX_NAME = "mockVertexName";
const MOCK_POINT = "mockPoint";

describe("imageVertexTransform", () => {
  test("returns default image effect transformation when default is passed", () => {
    const formattedEffectParams = DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS;
    const { vertexPointInstantiation, transformation } = imageToPointsTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      formattedEffectParams as ImageToPointsEffectProps
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });

  test("returns separate vertexPointInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS;
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { vertexPointInstantiation, transformation } = imageToPointsTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      effectParams as ImageToPointsEffectProps
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).not.toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });
});
