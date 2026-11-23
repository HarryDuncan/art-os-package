import { CUSTOM_BUFFER_GEOMETRY_TYPES, MESH_TYPES } from "../../../../config/mesh/consts";

export type RawPlaneGeometry = {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  // null for POINTS: drawn with drawArrays, one point per vertex.
  indices: Uint16Array | Uint32Array | null;
  vertexCount: number;
};

export type RawPlaneOptions = {
  geometryType: string;
  meshType: string;
  width: number;
  height: number;
  scale: number;
  // Shift the plane so its centre sits at the local origin.
  centered: boolean;
};

const UINT16_MAX_VERTICES = 65535;

// Three-free ports of `createPlaneFromDimensions` / `createSimplePlane` in
// src/config/mesh/geometry/createPlaneFromTexture.ts, so both engines produce
// the same vertex layout (and therefore the same `vUv` / point index per
// vertex) for a given mesh config.
export const createRawPlane = ({
  geometryType,
  meshType,
  width,
  height,
  scale,
  centered,
}: RawPlaneOptions): RawPlaneGeometry =>
  geometryType === CUSTOM_BUFFER_GEOMETRY_TYPES.SIMPLE_PLANE
    ? createSimpleRawPlane(width, height, scale, meshType)
    : createDetailedRawPlane(width, height, scale, meshType, centered);

// One vertex per grid cell (width x height vertices), corner-origin unless
// centred. Matches the three.js detailed plane: x/y step by `scale` and UVs
// run 0..1 across the grid.
const createDetailedRawPlane = (
  width: number,
  height: number,
  scale: number,
  meshType: string,
  centered: boolean,
): RawPlaneGeometry => {
  const xVerts = Math.max(1, Math.floor(width));
  const yVerts = Math.max(1, Math.floor(height));
  const vertexCount = xVerts * yVerts;
  const offsetX = centered ? -((xVerts - 1) * scale) / 2 : 0;
  const offsetY = centered ? -((yVerts - 1) * scale) / 2 : 0;

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);

  for (let i = 0; i < vertexCount; i += 1) {
    const x = i % xVerts;
    const y = Math.floor(i / xVerts);
    positions[i * 3] = x * scale + offsetX;
    positions[i * 3 + 1] = y * scale + offsetY;
    normals[i * 3 + 2] = 1;
    uvs[i * 2] = xVerts > 1 ? x / (xVerts - 1) : 0;
    uvs[i * 2 + 1] = yVerts > 1 ? y / (yVerts - 1) : 0;
  }

  if (meshType === MESH_TYPES.POINTS) {
    return { positions, normals, uvs, indices: null, vertexCount };
  }

  const quadCount = (xVerts - 1) * (yVerts - 1);
  const indices = allocateIndices(vertexCount, quadCount * 6);
  let o = 0;
  for (let y = 0; y < yVerts - 1; y += 1) {
    for (let x = 0; x < xVerts - 1; x += 1) {
      const topLeft = y * xVerts + x;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + xVerts;
      const bottomRight = bottomLeft + 1;
      indices[o++] = topLeft;
      indices[o++] = bottomLeft;
      indices[o++] = topRight;
      indices[o++] = topRight;
      indices[o++] = bottomLeft;
      indices[o++] = bottomRight;
    }
  }
  return { positions, normals, uvs, indices, vertexCount };
};

// Four-corner quad, always centred on the origin (as `createSimplePlane`).
const createSimpleRawPlane = (
  width: number,
  height: number,
  scale: number,
  meshType: string,
): RawPlaneGeometry => {
  const hw = (width * scale) / 2;
  const hh = (height * scale) / 2;
  const positions = new Float32Array([
    -hw, -hh, 0,
    hw, -hh, 0,
    -hw, hh, 0,
    hw, hh, 0,
  ]);
  const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
  const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  const indices =
    meshType === MESH_TYPES.POINTS
      ? null
      : new Uint16Array([0, 1, 2, 1, 3, 2]);
  return { positions, normals, uvs, indices, vertexCount: 4 };
};

const allocateIndices = (vertexCount: number, indexCount: number) =>
  vertexCount <= UINT16_MAX_VERTICES
    ? new Uint16Array(indexCount)
    : new Uint32Array(indexCount);
