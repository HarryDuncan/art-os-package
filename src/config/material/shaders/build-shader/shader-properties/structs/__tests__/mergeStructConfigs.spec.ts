import { Vector2, Vector3 } from "three";

import { expect, test, describe } from "vitest";
import { buildStruct } from "../buildStructs";
import { StructConfig } from "../../../types";
import { ShaderPropertyValueTypes } from "../../../constants";
import { mergeStructConfigs } from "../mergeStructConfigs";
import exp from "constants";

describe("mergeStructConfigs", () => {
  test("returns empty array when nothing is parsed/empty struct configs", () => {
    const emptyStructConfig = [];
    const result = mergeStructConfigs(emptyStructConfig);
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("returns an array with all three struct configs merged as one array", () => {
    const allTypeStructConfig = [
      {
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
      },
    ] as StructConfig[];
    const struct2 = [
      {
        id: "AllTypesStruct2",
        properties: [
          {
            id: "floatProp",
            valueType: ShaderPropertyValueTypes.FLOAT,
          },
        ],
      },
    ];
    const struct3 = [
      {
        id: "AllTypesStruct5",
        properties: [
          {
            id: "floatProp",
            valueType: ShaderPropertyValueTypes.FLOAT,
          },
        ],
      },
    ];
    const result = mergeStructConfigs([allTypeStructConfig, struct2, struct3]);
    expect(result.length).toStrictEqual(3);
    expect(result[0]).toEqual(allTypeStructConfig[0]);
    expect(result[1]).toEqual(struct2[0]);
    expect(result[2]).toEqual(struct3[0]);
  });
  test("If there is are struct configs with the same property name array the first occurrence will be returned and the second one discarded", () => {
    const struct2 = [
      {
        id: "AllTypesStruct",
        properties: [
          {
            id: "floatProp1",
            valueType: ShaderPropertyValueTypes.FLOAT,
          },
        ],
      },
    ];
    const struct3 = [
      {
        id: "AllTypesStruct",
        properties: [
          {
            id: "floatProp",
            valueType: ShaderPropertyValueTypes.FLOAT,
          },
        ],
      },
    ];
    const result = mergeStructConfigs([struct2, struct3]);
    expect(result.length).toStrictEqual(1);
    expect(result[0]).toEqual(struct2[0]);
  });
});
