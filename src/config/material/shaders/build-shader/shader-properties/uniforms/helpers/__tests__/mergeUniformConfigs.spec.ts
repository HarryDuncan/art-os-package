import { EMPTY_UNIFORM_CONFIG } from "../../uniforms.consts";
import { mergeUniformConfigs } from "../mergeUniformConfigs";
import { expect, test, describe } from "vitest";
import uniformConfigs from "./uniformConfigs.json";
import { UniformConfig } from "../../../../types";

describe("mergeUniformConfigs", () => {
  test("returns empty uniform config with empty array", () => {
    const result = mergeUniformConfigs(uniformConfigs[0] as UniformConfig[]);
    const expected = EMPTY_UNIFORM_CONFIG;
    expect(result).toStrictEqual(expected);
  });
  test("returns empty uniform config when an array of empty uniform configs is supplied", () => {
    const uniformConfigsToMerge = new Array(4).fill(EMPTY_UNIFORM_CONFIG);
    const result = mergeUniformConfigs(uniformConfigsToMerge);
    const expected = EMPTY_UNIFORM_CONFIG;
    expect(result).toStrictEqual(expected);
  });
  test("returns correctly merged uniform config", () => {
    const result = mergeUniformConfigs(uniformConfigs[1] as UniformConfig[]);
    const expected = {
      defaultUniforms: ["uPosition", "uResolution"],
      customUniforms: [
        { id: "uPower", valueType: "FLOAT", value: 1.5 },
        { id: "uTest", valueType: "FLOAT", value: 1.5 },
      ],
    };
    expect(result).toStrictEqual(expected);
  });
  test("returns merged uniform config removing duplicates in defaultUniforms and customUniforms", () => {
    const result = mergeUniformConfigs(uniformConfigs[2] as UniformConfig[]);
    const expected = {
      defaultUniforms: ["uPosition"],
      customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns merged uniform config filtering undefined or null values", () => {
    const testUniformConfigArray = [...uniformConfigs[2], undefined, null];
    const result = mergeUniformConfigs(
      testUniformConfigArray as UniformConfig[]
    );
    const expected = {
      defaultUniforms: ["uPosition"],
      customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
    };
    expect(result).toStrictEqual(expected);
  });

  test("if two uniform configs with the same id are passed the value of the uniform will be set to the first config in the array", () => {
    const testUniformConfigArray = [
      {
        defaultUniforms: ["uPosition"],
        customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 99.5 }],
      },
      ...uniformConfigs[2],
    ];
    const result = mergeUniformConfigs(
      testUniformConfigArray as UniformConfig[]
    );
    const expected = {
      defaultUniforms: ["uPosition"],
      customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 99.5 }],
    };
    expect(result).toStrictEqual(expected);
  });
});
