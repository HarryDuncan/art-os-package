import { expect, test, describe } from "vitest";
import { updateObjectUniformByKey } from "../updateObjectUniformByKey";
import { ExtendedMesh } from "config/mesh/mesh.types";

const MOCK_MESH_OBJECT = {
  material: {},
};
describe("updateObjectUniformByKeys", () => {
  test("updates a uniform by key to the appropriate value for a mesh", () => {
    let testMesh = {
      ...MOCK_MESH_OBJECT,
      material: {
        uniforms: {
          testValue1: { value: 1.0 },
        },
      },
    };
    updateObjectUniformByKey(
      testMesh as unknown as ExtendedMesh,
      "testValue1",
      2.0
    );
    expect(testMesh.material.uniforms.testValue1.value).toStrictEqual(2.0);
  });
  test("updates a uniform by key at the specified index to the appropriate value for a mesh", () => {
    let testMesh = {
      ...MOCK_MESH_OBJECT,
      material: {
        uniforms: {
          testValue1: { value: [1.0, 2.0, 3.0] },
        },
      },
    };
    updateObjectUniformByKey(
      testMesh as unknown as ExtendedMesh,
      "testValue1",
      2.0,
      2
    );
    updateObjectUniformByKey(
      testMesh as unknown as ExtendedMesh,
      "testValue1",
      55.0,
      0
    );
    expect(testMesh.material.uniforms.testValue1.value).toStrictEqual([
      55.0, 2.0, 2.0,
    ]);
  });
});
