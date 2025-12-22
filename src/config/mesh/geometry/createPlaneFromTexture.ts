import { BufferAttribute, BufferGeometry, Texture } from "three";
import { MeshType } from "../../../assets/geometry/geometry.types";
import { MESH_TYPES } from "../consts";

export const createPlaneFromTexture = (
  texture: Texture,
  renderMode: MeshType = MESH_TYPES.POINTS as MeshType
) => {
  // Get texture dimensions
  const width = texture.image?.width || 1;
  const height = texture.image?.height || 1;

  // Create a plane geometry with the texture dimensions
  const geometry = new BufferGeometry();

  // Calculate the number of vertices needed
  const vertexCount = width * height;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);

  // Generate vertices for each pixel/point
  for (let i = 0; i < vertexCount; i++) {
    const x = i % width;
    const y = Math.floor(i / width);

    // Set vertex positions (centered around origin)
    positions[i * 3 + 0] = x - width / 2; // x coordinate, normalized
    positions[i * 3 + 1] = y - height / 2; // y coordinate, normalized
    positions[i * 3 + 2] = 0; // z: flat plane

    // Set normals pointing up
    normals[i * 3 + 0] = 0; // nx
    normals[i * 3 + 1] = 0; // ny
    normals[i * 3 + 2] = 1; // nz

    // Set UV coordinates (handle division by zero)
    const u = width > 1 ? x / (width - 1) : 0;
    const v = height > 1 ? y / (height - 1) : 0;
    uvs[i * 2 + 0] = u; // u coordinate
    uvs[i * 2 + 1] = v; // v coordinate
  }

  // Create buffer attributes
  const positionAttribute = new BufferAttribute(positions, 3);
  const normalAttribute = new BufferAttribute(normals, 3);
  const uvAttribute = new BufferAttribute(uvs, 2);

  // Set attributes on geometry
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("normal", normalAttribute);
  geometry.setAttribute("uv", uvAttribute);

  if (renderMode === MESH_TYPES.POINTS) {
    // Point rendering setup
    const indices = new Uint16Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      indices[i] = i;
    }
    const indexAttribute = new BufferAttribute(indices, 1);
    geometry.setAttribute("pointIndex", indexAttribute);
    geometry.setIndex(null);
  } else {
    // Mesh rendering setup - create triangles from grid
    // Each quad (4 vertices) becomes 2 triangles (6 indices)
    const quadCount = (width - 1) * (height - 1);
    const indexCount = quadCount * 6; // 2 triangles per quad, 3 indices per triangle
    const indices = new Uint16Array(indexCount);

    let indexOffset = 0;
    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {
        const topLeft = y * width + x;
        const topRight = topLeft + 1;
        const bottomLeft = (y + 1) * width + x;
        const bottomRight = bottomLeft + 1;

        // First triangle (top-left, bottom-left, top-right)
        indices[indexOffset++] = topLeft;
        indices[indexOffset++] = bottomLeft;
        indices[indexOffset++] = topRight;

        // Second triangle (top-right, bottom-left, bottom-right)
        indices[indexOffset++] = topRight;
        indices[indexOffset++] = bottomLeft;
        indices[indexOffset++] = bottomRight;
      }
    }

    const indexAttribute = new BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
  }

  return geometry;
};

export const createPlaneFromDimensions = (
  width: number,
  height: number,
  scale: number = 1,
  renderMode: MeshType = MESH_TYPES.MESH as MeshType
) => {
  const geometry = new BufferGeometry();
  const vertexCount = width * height;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);

  // Generate vertices for each pixel/point
  for (let i = 0; i < vertexCount; i++) {
    const x = i % width;
    const y = Math.floor(i / width);

    // Set vertex positions (centered around origin)
    positions[i * 3 + 0] = x * scale; // x coordinate, normalized
    positions[i * 3 + 1] = y * scale; // y coordinate, normalized
    positions[i * 3 + 2] = 0; // z: flat plane

    // Set normals pointing up
    normals[i * 3 + 0] = 0; // nx
    normals[i * 3 + 1] = 0; // ny
    normals[i * 3 + 2] = 1; // nz

    // Set UV coordinates (handle division by zero)
    const u = width > 1 ? x / (width - 1) : 0;
    const v = height > 1 ? y / (height - 1) : 0;
    uvs[i * 2 + 0] = u; // u coordinate
    uvs[i * 2 + 1] = v; // v coordinate
  }

  // Create buffer attributes
  const positionAttribute = new BufferAttribute(positions, 3);
  const normalAttribute = new BufferAttribute(normals, 3);
  const uvAttribute = new BufferAttribute(uvs, 2);

  // Set attributes on geometry
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("normal", normalAttribute);
  geometry.setAttribute("uv", uvAttribute);

  if (renderMode === MESH_TYPES.POINTS) {
    // Point rendering setup
    const indices = new Uint16Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      indices[i] = i;
    }
    const indexAttribute = new BufferAttribute(indices, 1);
    geometry.setAttribute("pointIndex", indexAttribute);
    geometry.setIndex(null);
  } else {
    // Mesh rendering setup - create triangles from grid
    // Each quad (4 vertices) becomes 2 triangles (6 indices)
    const quadCount = (width - 1) * (height - 1);
    const indexCount = quadCount * 6; // 2 triangles per quad, 3 indices per triangle
    const indices = new Uint16Array(indexCount);

    let indexOffset = 0;
    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {
        const topLeft = y * width + x;
        const topRight = topLeft + 1;
        const bottomLeft = (y + 1) * width + x;
        const bottomRight = bottomLeft + 1;

        // First triangle (top-left, bottom-left, top-right)
        indices[indexOffset++] = topLeft;
        indices[indexOffset++] = bottomLeft;
        indices[indexOffset++] = topRight;

        // Second triangle (top-right, bottom-left, bottom-right)
        indices[indexOffset++] = topRight;
        indices[indexOffset++] = bottomLeft;
        indices[indexOffset++] = bottomRight;
      }
    }

    const indexAttribute = new BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
  }

  return geometry;
};

export const createSimplePlane = (
  width: number = 1,
  height: number = 1
): BufferGeometry => {
  const geometry = new BufferGeometry();

  // 4 vertices for a simple quad
  const positions = new Float32Array([
    // Bottom-left
    -width / 2,
    -height / 2,
    0,
    // Bottom-right
    width / 2,
    -height / 2,
    0,
    // Top-left
    -width / 2,
    height / 2,
    0,
    // Top-right
    width / 2,
    height / 2,
    0,
  ]);

  // Normals pointing up (positive Z)
  const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);

  // UV coordinates for full texture coverage
  const uvs = new Float32Array([
    // Bottom-left
    0, 0,
    // Bottom-right
    1, 0,
    // Top-left
    0, 1,
    // Top-right
    1, 1,
  ]);

  // Indices for 2 triangles (quad)
  const indices = new Uint16Array([
    0,
    1,
    2, // First triangle: bottom-left, bottom-right, top-left
    1,
    3,
    2, // Second triangle: bottom-right, top-right, top-left
  ]);

  // Create and set attributes
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.setIndex(new BufferAttribute(indices, 1));

  return geometry;
};
