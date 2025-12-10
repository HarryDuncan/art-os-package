import { BufferGeometry } from "three";
import {
  CustomGeometryConfig,
  CustomBufferGeometryType,
  DetailedPlaneConfig,
} from "../../types";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "../../consts";
import { createPlaneFromDimensions } from "../createPlaneFromTexture";
import { MeshType } from "../../../../assets/geometry/geometry.types";

export const setUpCustomBufferGeometry = (
  bufferGeometryType: CustomBufferGeometryType,
  bufferGeometryConfig: CustomGeometryConfig,
  scale: number,
  meshType: MeshType
) => {
  switch (bufferGeometryType) {
    case CUSTOM_BUFFER_GEOMETRY_TYPES.EMPTY:
      return emptyBuffer();
    case CUSTOM_BUFFER_GEOMETRY_TYPES.DETAILED_PLANE:
      return setUpDetailedPlane(
        bufferGeometryConfig as DetailedPlaneConfig,
        scale,
        meshType as MeshType
      );
    default:
      console.warn(
        `No custom buffer geometry has been set for ${bufferGeometryType}`
      );
  }
};

const setUpDetailedPlane = (
  bufferGeometryConfig: DetailedPlaneConfig,
  scale: number,
  meshType: MeshType
) => {
  const { height, width } = bufferGeometryConfig;
  const positionOffset = {
    x: width !== 0 ? -(width / 2) * scale : 0,
    y: height !== 0 ? -(height / 2) * scale : 0,
    z: 0,
  };
  return {
    geometry: createPlaneFromDimensions(
      width ?? 1,
      height ?? 1,
      scale,
      meshType as MeshType
    ),
    positionOffset,
  };
};

const emptyBuffer = () => {
  const bufferGeometry = new BufferGeometry();

  return { geometry: bufferGeometry, positionOffset: { x: 0, y: 0, z: 0 } };
};
