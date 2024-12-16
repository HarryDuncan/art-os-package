import { expect, test, describe, vi } from "vitest";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import {
  IMAGE_VERTEX_ATTRIBUTE_CONFIG,
  IMAGE_VERTEX_REQUIRED_FUNCTIONS,
  IMAGE_VERTEX_UNIFORM_CONFIG,
  IMAGE_VERTEX_VARYING_CONFIG,
} from "../imageVertexEffects.consts";
import { imageVertexEffect } from "../imageVertexEffect";

vi.mock("../imageVertexEffectTransform", () => ({
  imageVertexEffectTransform: () => ({
    uniformConfig: IMAGE_VERTEX_UNIFORM_CONFIG,
    requiredFunctions: IMAGE_VERTEX_REQUIRED_FUNCTIONS,
    transformation: "image transformation",
    vertexPointInstantiation: "imageVertex",
    effectPointName: "imageVertexPoint",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("imageVertexEffect", () => {
  test("returns default image vertex effect config when nothing is passed", () => {
    const vertexData = imageVertexEffect(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: IMAGE_VERTEX_REQUIRED_FUNCTIONS,
      uniformConfig: IMAGE_VERTEX_UNIFORM_CONFIG,
      transformation: "image transformation",
      varyingConfig: IMAGE_VERTEX_VARYING_CONFIG,
      attributeConfig: IMAGE_VERTEX_ATTRIBUTE_CONFIG,
      pointName: `${VERTEX_EFFECT_POINT_NAMES.IMAGE_VERTEX_POINT}`,
      vertexPointInstantiation: "imageVertex",
    };
    expect(vertexData).toEqual(expectedResult);
  });
});
