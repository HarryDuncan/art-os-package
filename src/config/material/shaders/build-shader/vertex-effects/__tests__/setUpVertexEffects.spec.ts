import { VertexEffectConfig } from "../../types";
import { EMPTY_UNIFORM_CONFIG } from "../../shader-properties/uniforms/uniforms.consts";
import { setUpVertexEffects } from "../setUpVertexEffects";
import { expect, test, describe, vi } from "vitest";
import configs from "./vertexEffectConfigs.json";

vi.mock("../effects/displacement/explode/explodeTransformation", () => ({
  explodeTransformation: () => "explodeTransformationString; ",
}));
vi.mock("../effects/filter-vertex/vertexFilterTransformation", () => ({
  vertexFilterTransformation: () => "vertexFilterTransformation; ",
}));

describe("setUpVertexEffects", () => {
  test("returns standard vertex effects if nothing is provided", () => {
    const result = setUpVertexEffects(configs[0] as VertexEffectConfig[]);
    const expected = {
      requiredFunctions: {},
      attributeConfigs: [],
      transformations: "",
      previousPointName: "explodedPoint",
      uniformConfigs: EMPTY_UNIFORM_CONFIG,
      varyingConfigs: [],
      viewMatrix: `gl_Position = projectionMatrix * modelViewMatrix * position;`,
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns standard vertex effects for EXPLODE", () => {
    const result = setUpVertexEffects(configs[1] as VertexEffectConfig[]);
    const expected = {
      requiredFunctions: {},
      attributeConfigs : [],
      transformations: "explodeTransformationString; ",
      uniformConfigs: {
        customUniforms: [
          {
            id: "uPower",
            valueType: "FLOAT",
            value: 1.5,
          },
        ],
        defaultUniforms: ["uPosition"],
      },
      varyingConfigs: [
        {
          id: "vPointId",
          valueType: "FLOAT",
          varyingType: "ATTRIBUTE",
        },
      ],
      viewMatrix: `gl_Position = projectionMatrix * modelViewMatrix * explodedPoint;`,
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns multiple vertex effects correctly", () => {
    const result = setUpVertexEffects(configs[2] as VertexEffectConfig[]);
    const expected = {
      requiredFunctions: {},
      attributeConfigs : [],
      transformations:
        "explodeTransformationString; vertexFilterTransformation; ",
      uniformConfigs: {
        customUniforms: [
          {
            id: "uPower",
            valueType: "FLOAT",
            value: 1.5,
          },
          { id: "uReduced", valueType: "FLOAT", value: 5.0 },
        ],
        defaultUniforms: ["uPosition"],
      },
      varyingConfigs: [
        {
          id: "vPointId",
          valueType: "FLOAT",
          varyingType: "ATTRIBUTE",
        },
      ],
      viewMatrix: "viewMatrix": "gl_Position = projectionMatrix * modelViewMatrix * vec4(filteredPoint.xyz, 1.0);",
    };
    expect(result).toStrictEqual(expected);
  });
});
