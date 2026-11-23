import { describe, expect, it } from "vitest";
import { createRawPlane } from "./createRawPlane";

const detailed = (overrides: Partial<Parameters<typeof createRawPlane>[0]> = {}) =>
  createRawPlane({
    geometryType: "DETAILED_PLANE",
    meshType: "MESH",
    width: 4,
    height: 3,
    scale: 1,
    centered: false,
    ...overrides,
  });

describe("createRawPlane", () => {
  it("builds a detailed plane with one vertex per grid cell", () => {
    const plane = detailed();
    expect(plane.vertexCount).toBe(12);
    expect(plane.positions).toHaveLength(36);
    expect(plane.normals).toHaveLength(36);
    expect(plane.uvs).toHaveLength(24);
    expect(plane.indices).toBeInstanceOf(Uint16Array);
    expect(plane.indices).toHaveLength(3 * 2 * 6);
  });

  it("runs UVs 0..1 from the first to the last vertex", () => {
    const { uvs } = detailed();
    expect([uvs[0], uvs[1]]).toEqual([0, 0]);
    expect([uvs[uvs.length - 2], uvs[uvs.length - 1]]).toEqual([1, 1]);
  });

  it("has no index buffer for points", () => {
    const plane = detailed({ meshType: "POINTS" });
    expect(plane.indices).toBeNull();
    expect(plane.vertexCount).toBe(12);
  });

  it("scales vertex spacing and centres on request", () => {
    const corner = detailed({ scale: 2 });
    expect(corner.positions[0]).toBe(0);
    expect(corner.positions[(12 - 1) * 3]).toBe(6);

    const centered = detailed({ scale: 2, centered: true });
    expect(centered.positions[0]).toBe(-3);
    expect(centered.positions[1]).toBe(-2);
    expect(centered.positions[(12 - 1) * 3]).toBe(3);
    expect(centered.positions[(12 - 1) * 3 + 1]).toBe(2);
  });

  it("switches to 32-bit indices above 65535 vertices", () => {
    const plane = detailed({ width: 300, height: 300 });
    expect(plane.vertexCount).toBe(90000);
    expect(plane.indices).toBeInstanceOf(Uint32Array);
  });

  it("builds a centred four-vertex simple plane", () => {
    const plane = createRawPlane({
      geometryType: "SIMPLE_PLANE",
      meshType: "MESH",
      width: 4,
      height: 2,
      scale: 0.5,
      centered: false,
    });
    expect(plane.vertexCount).toBe(4);
    expect(Array.from(plane.positions.slice(0, 3))).toEqual([-1, -0.5, 0]);
    expect(Array.from(plane.positions.slice(9, 12))).toEqual([1, 0.5, 0]);
    expect(Array.from(plane.indices ?? [])).toEqual([0, 1, 2, 1, 3, 2]);
    expect(Array.from(plane.uvs)).toEqual([0, 0, 1, 0, 0, 1, 1, 1]);
  });
});
