import { mergeAttributeConfigs } from "../mergeAttributeConfigs";
import { expect, test, describe } from "vitest";
import attributeConfig from "./attributeConfigs.json";

describe("mergeAttributeConfig", () => {
  test("returns empty attribute config with empty array", () => {
    const result = mergeAttributeConfigs(attributeConfig[0]);
    expect(result).toStrictEqual([]);
  });
  test("returns correctly merged attribute config", () => {
    const result = mergeAttributeConfigs(attributeConfig[1]);
    const expected = [
      { id: "random", valueType: "FLOAT", value: 0 },
      { id: "random2", valueType: "FLOAT", value: 0 },
    ];
    expect(result).toStrictEqual(expected);
  });
  test("returns merged attribute config removing duplicates attribute ids", () => {
    const result = mergeAttributeConfigs(attributeConfig[2]);
    const expected = [
      { id: "random", valueType: "FLOAT", value: 0 },
      { id: "random2", valueType: "FLOAT", value: 0 },
    ];
    expect(result).toStrictEqual(expected);
  });
});
