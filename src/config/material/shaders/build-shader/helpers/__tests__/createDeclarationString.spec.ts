import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../../constants/buildShader.consts";
import { expect, test, describe } from "vitest";
import { createDeclarationString } from "../createDeclarationString";

describe("createDeclarationString", () => {
  test("returns correct declaration for uniform", () => {
    const result = createDeclarationString(
      ShaderPropertyTypes.UNIFORM,
      ShaderPropertyValueTypes.FLOAT,
      "uTest"
    );
    const expected = "uniform float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for uniform that is an array of 9", () => {
    const result = createDeclarationString(
      ShaderPropertyTypes.UNIFORM,
      ShaderPropertyValueTypes.FLOAT,
      "uTest",
      10
    );
    const expected = "uniform float uTest[10];";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for varying", () => {
    const result = createDeclarationString(
      ShaderPropertyTypes.VARYING,
      ShaderPropertyValueTypes.FLOAT,
      "uTest"
    );
    const expected = "varying float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for attribute", () => {
    const result = createDeclarationString(
      ShaderPropertyTypes.ATTRIBUTE,
      ShaderPropertyValueTypes.FLOAT,
      "uTest"
    );
    const expected = "attribute float uTest;";
    expect(result).toStrictEqual(expected);
  });
});
