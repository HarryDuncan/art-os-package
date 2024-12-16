import { expect, test, describe, vi } from "vitest";
import { setUpCustomBufferGeometry } from "../setupCustomBufferGeometry";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "../../../mesh.consts";
import { CustomBufferGeometryType } from "../../../mesh.types";

describe("setupCustomBufferGeometry", () => {
  test("Sets up a default quad geometry", () => {
    const mockConfig = {};
    const quadGeometry = setUpCustomBufferGeometry(
      CUSTOM_BUFFER_GEOMETRY_TYPES.QUAD as CustomBufferGeometryType,
      mockConfig
    );

    const expectedVerticesCount = 4;
    expect(quadGeometry.attributes.position.count).toBe(expectedVerticesCount);
  });
});
