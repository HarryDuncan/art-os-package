export type PlaneGeometry = {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint32Array;
  indexCount: number;
  vertexCount: number;
};

// Subdivided plane in clip space: x, y in [-1, 1], z = 0, normal = (0, 0, 1).
// Identity model/view/projection matrices in the renderer therefore draw the
// plane fullscreen, while still giving the vertex shader many vertices to
// displace if it wants to.
export const createPlaneGeometry = (
  xSegments = 128,
  ySegments = 128,
): PlaneGeometry => {
  const xVerts = xSegments + 1;
  const yVerts = ySegments + 1;
  const vertexCount = xVerts * yVerts;

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(xSegments * ySegments * 6);

  for (let y = 0; y < yVerts; y += 1) {
    for (let x = 0; x < xVerts; x += 1) {
      const u = x / xSegments;
      const v = y / ySegments;
      const i = y * xVerts + x;
      positions[i * 3 + 0] = u * 2 - 1;
      positions[i * 3 + 1] = v * 2 - 1;
      positions[i * 3 + 2] = 0;
      normals[i * 3 + 0] = 0;
      normals[i * 3 + 1] = 0;
      normals[i * 3 + 2] = 1;
      uvs[i * 2 + 0] = u;
      uvs[i * 2 + 1] = v;
    }
  }

  let idx = 0;
  for (let y = 0; y < ySegments; y += 1) {
    for (let x = 0; x < xSegments; x += 1) {
      const a = y * xVerts + x;
      const b = a + 1;
      const c = a + xVerts;
      const d = c + 1;
      indices[idx + 0] = a;
      indices[idx + 1] = b;
      indices[idx + 2] = c;
      indices[idx + 3] = b;
      indices[idx + 4] = d;
      indices[idx + 5] = c;
      idx += 6;
    }
  }

  return {
    positions,
    normals,
    uvs,
    indices,
    indexCount: indices.length,
    vertexCount,
  };
};
