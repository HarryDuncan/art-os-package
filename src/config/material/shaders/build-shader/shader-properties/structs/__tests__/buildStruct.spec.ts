import { Vector2, Vector3 } from "three";

import { expect, test, describe } from "vitest";
import { buildStruct } from "../buildStructs";
import { StructConfig } from "../../../types";
import { ShaderPropertyValueTypes } from "../../../constants";

describe("buildStruct", () => {
  test("returns declaration with no structs", () => {
    const emptyStructConfig = [];
    const result = buildStruct(emptyStructConfig);
    const expected = "// STRUCT DECLARATION";
    expect(result).toStrictEqual(expected);
  });

  test("returns declaration for a struct with all the different types of shader properties", () => {
    const allTypeStructConfig = {
      id: "AllTypesStruct",
      properties: [
        {
          id: "floatProp",
          valueType: ShaderPropertyValueTypes.FLOAT,
        },
        {
          id: "vec2Prop",
          valueType: ShaderPropertyValueTypes.VEC2,
        },
      ],
    } as StructConfig;
    const result = buildStruct([allTypeStructConfig]);
    const expected =
      "// STRUCT DECLARATION \n struct AllTypesStruct { \n float floatProp; \n vec2 vec2Prop; \n };";
    expect(result).toStrictEqual(expected);
  });
});
