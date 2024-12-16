import { expect, test, describe, vi } from "vitest";
import {
  IMAGE_TO_POINTS_ATTRIBUTE_CONFIG,
  IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  IMAGE_TO_POINTS_UNIFORM_CONFIG,
  IMAGE_TO_POINTS_VARYING_CONFIG,
} from "../imageToPoints.consts";

import { imageToPoints } from "../imageToPoints";

vi.mock("../imageToPointsTransform", () => ({
  imageToPointsTransform: () => ({
    uniformConfig: IMAGE_TO_POINTS_UNIFORM_CONFIG,
    requiredFunctions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
    transformation: "image to points transformation",
    vertexPointInstantiation: "imageVertex",
    effectPointName: "imageVertexPoint",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("imageToPointEffect", () => {
  test("returns default image vertex effect config when nothing is passed", () => {
    const vertexData = imageToPoints(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
      uniformConfig: IMAGE_TO_POINTS_UNIFORM_CONFIG,
      transformation: "image to points transformation",
      varyingConfig: IMAGE_TO_POINTS_VARYING_CONFIG,
      attributeConfig: IMAGE_TO_POINTS_ATTRIBUTE_CONFIG,
      pointName: "imageVertexPoint_IMAGE_EFFECT",
      vertexPointInstantiation: "imageVertex",
    };
    expect(vertexData).toEqual(expectedResult);
  });
});
