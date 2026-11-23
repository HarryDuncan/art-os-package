import { describe, expect, it } from "vitest";
import { MeshTransformConfig } from "../../../../config/config.types";
import { buildRawWebglAttributes } from "./buildRawWebglAttributes";

const transform = (
  guid: string,
  key: string,
  transformedMeshIds: string[],
): MeshTransformConfig => ({
  guid,
  transformedMeshIds,
  values: { [key]: { guid: `${guid}-v`, type: "indexed", value: 0 } },
  inputMapping: {},
  outputMapping: {},
});

const transforms = [
  transform("t-a", "onlyA", ["mesh-a"]),
  transform("t-b", "onlyB", ["mesh-b"]),
  transform("t-all", "everyone", []),
];

describe("buildRawWebglAttributes", () => {
  it("only applies transforms that target the mesh, plus untargeted ones", () => {
    const attributes = buildRawWebglAttributes(transforms, 4, [], "mesh-a");
    expect(Object.keys(attributes).sort()).toEqual(["a_everyone", "a_onlyA"]);
  });

  it("applies every transform to the legacy plane (no mesh id)", () => {
    const attributes = buildRawWebglAttributes(transforms, 4, []);
    expect(Object.keys(attributes).sort()).toEqual([
      "a_everyone",
      "a_onlyA",
      "a_onlyB",
    ]);
  });

  it("sizes attributes to the mesh's vertex count", () => {
    const attributes = buildRawWebglAttributes(transforms, 7, [], "mesh-b");
    expect(attributes.a_onlyB.array).toHaveLength(7);
    expect(Array.from(attributes.a_onlyB.array)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});
