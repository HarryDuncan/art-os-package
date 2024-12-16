import { Vector3 } from "three";
import { buildShader } from "../buildShader";
import shaderConfig from "./config.json";
import { expect, test, describe, vi } from "vitest";

vi.mock(
  "../vertex-effects/effects/displacement/explode/explodeTransformation",
  () => ({
    explodeTransformation: () => "explodeTransformationString;",
  })
);

describe("buildShader", () => {
  test("builds standard shader if config is empty", () => {
    const config = shaderConfig[0];
    const result = buildShader(config);
    const expected = {
      fragmentShader:
        "// UNIFORM DECLARATION \n uniform float uTime; \n // VARYING DECLARATION \n void main() { \n vec4 fragColor = vec4(1.0,0,0,1.0); \n gl_FragColor = fragColor; \n }",
      uniforms: {
        uTime: {
          value: 0,
        },
      },
      vertexShader:
        "// UNIFORM DECLARATION \n uniform float uTime; \n // VARYING DECLARATION \n void main() { \n gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); \n }",
    };
    expect(result).toEqual(expected);
  });
  test("builds the correct shader if according to the config", () => {
    const result = buildShader(shaderConfig[1]);
    const expected = {
      uniforms: {
        uPosition: {
          value: new Vector3(0, 0, 0),
        },

        uPower: {
          value: 1.5,
        },
        uTime: {
          value: 0,
        },
      },
      fragmentShader:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform float uPower; \n // VARYING DECLARATION \n varying float vPointId; \n void main() { \n vec4 fragColor = vec4(1.0,0,0,1.0); \n gl_FragColor = fragColor; \n }",
      vertexShader:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform float uPower; \n // VARYING DECLARATION \n varying float vPointId; \n void main() { \n explodeTransformationString; \n gl_Position = projectionMatrix * modelViewMatrix * vec4(explodedPoint, 1.0); \n }",
    };
    expect(result).toContainEqual(expected);
  });
});
