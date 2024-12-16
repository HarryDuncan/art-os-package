import { expect, test, describe } from "vitest";
import { transformGeometry } from "../transformGeometries";
import { MESH_TRANSFORM } from "../../../mesh.consts";
import { FormattedGeometry } from "assets/geometry/geometry.types";
import { BufferAttribute, BufferGeometry } from "three";
import { getAttributes } from "../../../attributes/attribute.functions";

const MOCK_MESH_TRANSFORM = [
  {
    type: MESH_TRANSFORM.DEFAULT,
    transformedMeshIds: ["mercury-geometry"],
  },
];
const MOCK_GEOMETRIES = [
  {
    groupId: undefined,
    meshType: "MESH",
    name: "mercury-geometry",
    position: { x: 0, y: 0, z: 4 },
    rotation: { x: 0, y: -0, z: -0 },
  },
];

const createMockBufferGeometry = () => {
  const geometry = new BufferGeometry();
  const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  return geometry;
};
describe("transformGeometries", () => {
  test("returns geometries with no custom attributes if a transform type is not specified", () => {
    const geometries = MOCK_GEOMETRIES.map((geom) => ({
      ...geom,
      geometry: createMockBufferGeometry(),
    }));
    const transformed = transformGeometry(
      MOCK_MESH_TRANSFORM,
      geometries as FormattedGeometry[]
    );
    const attributes = getAttributes(transformed[0].geometry);
    expect(Object.keys(attributes)).toEqual(["position"]);
  });

  test("returns geometries with mesh morph transform attributes", () => {
    const geometries = MOCK_GEOMETRIES.map((geom) => ({
      ...geom,
      geometry: createMockBufferGeometry(),
    }));
    const transform = [
      {
        type: MESH_TRANSFORM.MORPH,
        transformedMeshIds: ["mercury-geometry"],
      },
    ];
    const transformed = transformGeometry(
      transform,
      geometries as FormattedGeometry[]
    );
    const attributes = getAttributes(transformed[0].geometry);
    expect(Object.keys(attributes)).toEqual([
      "position",
      "pointIndex",
      "randomAngle",
      "randomBool",
      "randomBool2",
    ]);
  });
  test("returns geometries with mesh parsed transform attributes", () => {
    const geometries = MOCK_GEOMETRIES.map((geom) => ({
      ...geom,
      geometry: createMockBufferGeometry(),
    }));
    const attributeConfig = [
      {
        id: "randomBool24",
        valueType: "FLOAT",
        valueConfig: { randomizedPercentage: 0.2 },
      },
    ];
    const transform = [
      {
        type: MESH_TRANSFORM.CUSTOM_ATTRIBUTES,
        transformedMeshIds: ["mercury-geometry"],
        attributeConfig,
      },
    ];

    const transformed = transformGeometry(
      transform,
      geometries as FormattedGeometry[]
    );

    const attributes = getAttributes(transformed[0].geometry);
    expect(Object.keys(attributes)).toEqual(["position", "randomBool24"]);
  });

  test("doesn't alter/add attributes to non selected meshes", () => {
    const geometries = MOCK_GEOMETRIES.map((geom) => ({
      ...geom,
      geometry: createMockBufferGeometry(),
    }));
    const transform = [
      {
        type: MESH_TRANSFORM.MORPH,
        transformedMeshIds: ["mercury-2-geometry"],
      },
    ];
    const transformed = transformGeometry(
      transform,
      geometries as FormattedGeometry[]
    );
    const attributes = getAttributes(transformed[0].geometry);
    expect(Object.keys(attributes)).toEqual(["position"]);
  });
});
