import { VaryingConfig } from "../../varyings.types";
import { mergeVaryingConfigs } from "../mergeVaryingConfigs";
import { expect, test, describe } from "vitest";

import varyingConfigs from "./testVaryings.json";
describe("mergeVaryingConfigs", () => {
  test("returns empty varying config on empty array", () => {
    const result = mergeVaryingConfigs(varyingConfigs[0] as VaryingConfig[]);
    const expected = [];
    expect(result).toStrictEqual(expected);
  });
  test("returns correctly merged varying config", () => {
    const result = mergeVaryingConfigs(varyingConfigs[1] as VaryingConfig[]);
    const expected = [
      { id: "vUv", type: "VEC2", varyingType: "DEFAULT" },
      { id: "vColor", type: "VEC3", varyingType: "CUSTOM" },
      { id: "vColor2", type: "VEC3", varyingType: "CUSTOM" },
    ];
    expect(result).toStrictEqual(expected);
  });
  test("returns merged varying config removing duplicates with the same id", () => {
    const result = mergeVaryingConfigs(varyingConfigs[2] as VaryingConfig[]);
    const expected = [
      { id: "vColor", type: "VEC3", varyingType: "CUSTOM" },
      { id: "vColor2", type: "VEC3", varyingType: "CUSTOM" },
    ];
    expect(result).toStrictEqual(expected);
  });
});
