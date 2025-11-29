import { BufferAttribute, BufferGeometry, Texture } from "three";

export const createPlaneFromTexture = (texture: Texture) => {
  // Get texture dimensions
  const width = texture.image?.width || 1;
  const height = texture.image?.height || 1;

  // Create a plane geometry with the texture dimensions
  const geometry = new BufferGeometry();

  // Calculate the number of vertices needed
  const vertexCount = width * height;
  const indices = new Uint16Array(vertexCount);
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

    // Set indices
    indices[i] = i;

    // Set normals pointing up
    normals[i * 3 + 0] = 0; // nx
    normals[i * 3 + 1] = 0; // ny
    normals[i * 3 + 2] = 1; // nz

    // Set UV coordinates
    uvs[i * 2 + 0] = x / (width - 1); // u coordinate
    uvs[i * 2 + 1] = y / (height - 1); // v coordinate
  }

  // Create buffer attributes
  const positionAttribute = new BufferAttribute(positions, 3);
  const normalAttribute = new BufferAttribute(normals, 3);
  const uvAttribute = new BufferAttribute(uvs, 2);
  const indexAttribute = new BufferAttribute(indices, 1);

  // Set attributes on geometry
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("normal", normalAttribute);
  geometry.setAttribute("uv", uvAttribute);
  geometry.setAttribute("pointIndex", indexAttribute);

  // Set index to null for point rendering
  geometry.setIndex(null);
  return geometry;
};

export const createPlaneFromDimensions = (width: number, height: number) => {
  const geometry = new BufferGeometry();
  const vertexCount = width * height;
  const indices = new Uint16Array(vertexCount);
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  // const uvs = new Float32Array(vertexCount * 2);

  // Generate vertices for each pixel/point
  for (let i = 0; i < vertexCount; i++) {
    const x = i % width;
    const y = Math.floor(i / width);

    // Set vertex positions (centered around origin)
    positions[i * 3 + 0] = x; // x coordinate, normalized
    positions[i * 3 + 1] = y; // y coordinate, normalized
    positions[i * 3 + 2] = 0; // z: flat plane

    // Set indices
    indices[i] = i;

    // Set normals pointing up
    normals[i * 3 + 0] = 0; // nx
    normals[i * 3 + 1] = 0; // ny
    normals[i * 3 + 2] = 1; // nz
  }

  // Create buffer attributes
  const positionAttribute = new BufferAttribute(positions, 3);
  const normalAttribute = new BufferAttribute(normals, 3);
  // const uvAttribute = new BufferAttribute(uvs, 2);
  const indexAttribute = new BufferAttribute(indices, 1);

  // Set attributes on geometry
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("normal", normalAttribute);
  // geometry.setAttribute("uv", uvAttribute);
  geometry.setAttribute("pointIndex", indexAttribute);

  // Set index to null for point rendering
  geometry.setIndex(null);

  return geometry;
};
