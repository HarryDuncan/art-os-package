import { expect, test, describe } from "vitest";
import { UniformConfig } from "../../../../types";
import { formatParsedUniformConfigs } from "../../formatParsedUniformConfigs";
import { Vector3 } from "three";

describe("formatParsedUniformConfigs", () => {
  test("returns normal uniform config with un changed values", () => {
    const MOCK_UNIFORM = {
      defaultUniforms: ["uPosition"],
      customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
    };
    const result = formatParsedUniformConfigs(MOCK_UNIFORM as UniformConfig);
    expect(result).toStrictEqual(MOCK_UNIFORM);
  });
  test("returns color uniforms that are hex strings as vector3s", () => {
    const MOCK_UNIFORM = {
      defaultUniforms: ["uPosition"],
      customUniforms: [
        { id: "uPower", valueType: "FLOAT", value: 1.5 },
        { id: "uColor", valueType: "VEC3", value: "#ffffff" },
      ],
    };
    const result = formatParsedUniformConfigs(MOCK_UNIFORM as UniformConfig);
    // @ts-ignore
    expect(result.customUniforms[1]).toStrictEqual({
      id: "uColor",
      valueType: "VEC3",
      value: new Vector3(1, 1, 1),
    });
  });
});
