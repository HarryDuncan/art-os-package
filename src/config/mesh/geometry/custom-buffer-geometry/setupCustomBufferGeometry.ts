import { BufferAttribute, BufferGeometry } from "three";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "../../mesh.consts";
import {
  BufferGeometryConfig,
  CustomBufferGeometryType,
} from "../../mesh.types";

export const setUpCustomBufferGeometry = (
  bufferGeometryType: CustomBufferGeometryType,
  _bufferGeometryConfig: BufferGeometryConfig
) => {
  switch (bufferGeometryType) {
    case CUSTOM_BUFFER_GEOMETRY_TYPES.QUAD:
      return setUpQuad();
    case CUSTOM_BUFFER_GEOMETRY_TYPES.EMPTY:
      console.log("getting custom buffer");
      return emptyBuffer();
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

const emptyBuffer = () => {
  const bufferGeometry = new BufferGeometry();

  return bufferGeometry;
};
