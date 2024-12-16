import { Vector2, Vector3 } from "three";
import { buildUniforms } from "../buildUniforms";
import configs from "./uniformConfigs.json";
import { UniformConfig } from "../uniforms.types";
import { expect, test, describe } from "vitest";

describe("buildUniforms", () => {
  test("returns empty config with mandatory uniforms", () => {
    const result = buildUniforms(configs[0] as UniformConfig);
    const expected = {
      uniformDeclaration: "// UNIFORM DECLARATION \n uniform float uTime;",
      uniforms: { uTime: { value: 0 } },
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns default uniforms", () => {
    const result = buildUniforms(configs[1] as UniformConfig);
    const expected = {
      uniformDeclaration:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform vec2 uResolution;",
      uniforms: {
        uTime: { value: 0 },
        uPosition: { value: new Vector3(0, 0, 0) },
        uResolution: { value: new Vector2(1, 1) },
      },
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns configured uniforms", () => {
    const result = buildUniforms(configs[2] as UniformConfig);
    const expected = {
      uniformDeclaration:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform vec2 uResolution; \n uniform float uPower; \n uniform float uReduced;",
      uniforms: {
        uPosition: { value: new Vector3(0, 0, 0) },
        uPower: { value: 0 },
        uReduced: { value: 15.5 },
        uResolution: { value: new Vector2(1, 1) },
        uTime: { value: 0 },
      },
    };
    expect(result).toStrictEqual(expected);
  });
  test("returns correct uniform with an array of floats", () => {
    const VEC3_ARRAY_UNIFORM_CONFIG = {
      defaultUniforms: [],
      customUniforms: [
        { id: "uArray", valueType: "FLOAT", arrayLength: 3 },
        { id: "uArray2", valueType: "FLOAT", value: 15.5, arrayLength: 3 },
      ],
    } as UniformConfig;
    const { uniforms, uniformDeclaration } = buildUniforms(
      VEC3_ARRAY_UNIFORM_CONFIG
    );
    expect(uniformDeclaration).toContain("float uArray[3];");
    // @ts-ignore
    expect(uniforms.uArray.value.length).toStrictEqual(3);
    // @ts-ignore
    expect(uniforms.uArray2.value.length).toEqual(3);
  });
  test("returns correct uniforms with an array of predefined vec3s", () => {
    const VEC3_ARRAY_UNIFORM_CONFIG = {
      defaultUniforms: [],
      customUniforms: [
        {
          id: "uArray",
          valueType: "VEC3",
          arrayLength: 2,
          value: [new Vector3(1, 1, 1), new Vector3(2, 2, 2)],
        },
      ],
    } as UniformConfig;
    const { uniforms, uniformDeclaration } = buildUniforms(
      VEC3_ARRAY_UNIFORM_CONFIG
    );
    expect(uniformDeclaration).toContain("vec3 uArray[2];");
    // @ts-ignore
    expect(uniforms.uArray.value.length).toStrictEqual(2);
    expect(uniforms.uArray.value[0]).toEqual([
      new Vector3(1, 1, 1),
      new Vector3(2, 2, 2),
    ]);
  });
  test("struct uniforms are correctly initialized, declaration string uses their id and the data is set up correctly", () => {
    const VEC3_ARRAY_UNIFORM_CONFIG = {
      defaultUniforms: [],
      customUniforms: [
        {
          id: "uArray",
          valueType: "STRUCT",
          arrayLength: 3,
          structProperties: {
            id: "ArrayStruct",
            properties: [{ id: "Array2", valueType: "FLOAT", value: 15.5 }],
          },
        },
      ],
    } as UniformConfig;
    const { uniforms, uniformDeclaration } = buildUniforms(
      VEC3_ARRAY_UNIFORM_CONFIG
    );
    expect(uniformDeclaration).toContain("ArrayStruct uArray[3];");
    // @ts-ignore
    expect(uniforms.uArray.value.length).toStrictEqual(3);
    // @ts-ignore
    expect(uniforms.uArray.value[0]).toEqual({ Array2: 15.5 });
  });
});
