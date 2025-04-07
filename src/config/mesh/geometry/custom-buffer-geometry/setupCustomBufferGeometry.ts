import { BufferAttribute, BufferGeometry } from "three";
import {
  CustomGeometryConfig,
  CustomBufferGeometryType,
  FullQuadConfig,
} from "../../../../types/mesh.types";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "../../../../consts/mesh.consts";

export const setUpCustomBufferGeometry = (
  bufferGeometryType: CustomBufferGeometryType,
  bufferGeometryConfig: CustomGeometryConfig
) => {
  switch (bufferGeometryType) {
    case CUSTOM_BUFFER_GEOMETRY_TYPES.QUAD:
      return setUpQuad();
    case CUSTOM_BUFFER_GEOMETRY_TYPES.EMPTY:
      return emptyBuffer();
    case CUSTOM_BUFFER_GEOMETRY_TYPES.FULL_QUAD:
      return setUpFullQuad(bufferGeometryConfig as FullQuadConfig);
    default:
      console.warn(
        `No custom buffer geometry has been set for ${bufferGeometryType}`
      );
  }
};

const setUpQuad = () => {
  const bufferGeometry = new BufferGeometry();
  // positions
  const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
  positions.setXYZ(0, -1, 1, 0.0);
  positions.setXYZ(1, 1, 1, 0.0);
  positions.setXYZ(2, -1, -1, 0.0);
  positions.setXYZ(3, 1, -1, 0.0);
  bufferGeometry.setAttribute("position", positions);

  // uvs
  const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
  // @ts-ignore
  uvs.setXYZ(0, 0.0, 0.0);
  // @ts-ignore
  uvs.setXYZ(1, 1.0, 0.0);
  // @ts-ignore
  uvs.setXYZ(2, 0.0, 1.0);
  // @ts-ignore
  uvs.setXYZ(3, 1.0, 1.0);
  bufferGeometry.setAttribute("uv", uvs);

  // index
  bufferGeometry.setIndex(
    new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
  );
  return bufferGeometry;
};

const setUpFullQuad = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const bufferGeometry = new BufferGeometry();

  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= height; i++) {
    const y = (i / height) * height - height / 2;
    for (let j = 0; j <= width; j++) {
      const x = (j / width) * width - width / 2;

      // Add vertex position
      vertices.push(x, -y, 0);

      // Add UV coordinates
      uvs.push(j / width, i / height);
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const a = i * (width + 1) + j;
      const b = i * (width + 1) + j + 1;
      const c = (i + 1) * (width + 1) + j;
      const d = (i + 1) * (width + 1) + j + 1;

      // Create two triangles (a, b, c) and (b, d, c)
      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  bufferGeometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(vertices), 3)
  );
  bufferGeometry.setAttribute(
    "uv",
    new BufferAttribute(new Float32Array(uvs), 2)
  );
  bufferGeometry.setIndex(indices);

  return bufferGeometry;
};
const emptyBuffer = () => {
  const bufferGeometry = new BufferGeometry();

  return bufferGeometry;
};
