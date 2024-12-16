import { expect, test, describe } from "vitest";
import { preTransforms } from "../preTransforms";
import { vertexTranslate } from "display/materials/webgl-shaders/shader-functions/translation/translate";
import { TransformTypes } from "../../../../vertexEffects.consts";

const TRANSLATE_MOCK = [
  {
    index: 3,
    pointName: "test",
    transformType: TransformTypes.TRANSLATE,
    transformProps: { translate: { z: 10 } },
  },
];
describe("preTransforms", () => {
  test("returns empty values if no transform configs are passed", () => {
    const result = preTransforms([]);
    expect(result).toEqual([]);
  });
  test("returns transform text for the object specified by the index", () => {
    const result = preTransforms(TRANSLATE_MOCK);
    expect(result[0].transform).toContain(
      `vec3 translateVector = vec3(0.00, 0.00, 10.00);`
    );
    console.log(result);
    expect(result[0].transform).toContain(
      `vec3 transformTest3 = translateVertex(translateVector, test.xyz);`
    );
  });

  test("returns the required functions", () => {
    const result = preTransforms(TRANSLATE_MOCK);
    expect(result[0].requiredFunctions).toEqual([
      { id: "translate", functionDefinition: vertexTranslate },
    ]);
  });

  test("returns the correct transform name for position and normals", () => {
    const result = preTransforms(TRANSLATE_MOCK);
    expect(result[0].positionName).toEqual("transformTest3");
    expect(result[0].normalName).toEqual("transformTest3");
  });
});
