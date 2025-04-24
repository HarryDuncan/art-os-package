import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/buildShader.consts";
import { expect, test, describe } from "vitest";
import { createDeclarationString } from "../createDeclarationString";

describe("createDeclarationString", () => {
  test("returns correct declaration for uniform", () => {
    const result = createDeclarationString(
      SHADER_PROPERTY_TYPES.UNIFORM,
      SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "uniform float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for uniform that is an array of 9", () => {
    const result = createDeclarationString(
      SHADER_PROPERTY_TYPES.UNIFORM,
      SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      "uTest",
      10
    );
    const expected = "uniform float uTest[10];";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for varying", () => {
    const result = createDeclarationString(
      SHADER_PROPERTY_TYPES.VARYING,
      SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "varying float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for attribute", () => {
    const result = createDeclarationString(
      SHADER_PROPERTY_TYPES.ATTRIBUTE,
      SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "attribute float uTest;";
    expect(result).toStrictEqual(expected);
  });
});
