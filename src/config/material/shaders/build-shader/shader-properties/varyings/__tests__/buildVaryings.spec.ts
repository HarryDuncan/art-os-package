import { buildVaryings } from "../buildVaryings";
import { VaryingConfig } from "../varyings.types";
import { expect, test, describe } from "vitest";
import config from "./varyingConfigs.json";

describe("buildVaryings", () => {
  test("returns empty config with mandatory varyings", () => {
    const result = buildVaryings(config[0] as VaryingConfig);
    const expected = {
      declaration: "// VARYING DECLARATION",
      instantiation: "",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns default varyings", () => {
    const result = buildVaryings(config[1] as VaryingConfig);
    const expected = {
      declaration: "// VARYING DECLARATION \n varying vec2 vUv;",
      instantiation: "// DEFAULT VARYING INSTANTIATION \n vUv = uv;",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns custom varyings", () => {
    const result = buildVaryings(config[2] as VaryingConfig);
    const expected = {
      declaration: "// VARYING DECLARATION \n varying vec3 vColor;",
      instantiation: "// CUSTOM VARYING \n vColor = vec3(0.0, 0.0, 0.0);",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns attribute varyings", () => {
    const result = buildVaryings(config[3] as VaryingConfig);
    const expected = {
      declaration: "// VARYING DECLARATION \n varying float vPointId;",
      instantiation: "",
    };
    expect(result).toStrictEqual(expected);
  });
});
