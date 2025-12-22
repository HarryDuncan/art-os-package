import { BufferGeometry } from "three";
import {
  CustomGeometryConfig,
  CustomBufferGeometryType,
  DetailedPlaneConfig,
} from "../../types";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "../../consts";
import {
  createPlaneFromDimensions,
  createSimplePlane,
} from "../createPlaneFromTexture";
import { MeshType } from "../../../../assets/geometry/geometry.types";

export const setUpCustomBufferGeometry = (
  bufferGeometryType: CustomBufferGeometryType,
  bufferGeometryConfig: CustomGeometryConfig,
  scale: number,
  centerGeometryToOrigin: boolean,
  meshType: MeshType
) => {
  switch (bufferGeometryType) {
    case CUSTOM_BUFFER_GEOMETRY_TYPES.EMPTY:
      return emptyBuffer();
    case CUSTOM_BUFFER_GEOMETRY_TYPES.DETAILED_PLANE:
      return setUpDetailedPlane(
        bufferGeometryConfig as DetailedPlaneConfig,
        scale,
        centerGeometryToOrigin,
        meshType as MeshType
      );
    case CUSTOM_BUFFER_GEOMETRY_TYPES.SIMPLE_PLANE:
      return setUpSimplePlane(
        bufferGeometryConfig as DetailedPlaneConfig,
        scale,
        centerGeometryToOrigin
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
  centerGeometryToOrigin: boolean,
  meshType: MeshType
) => {
  const { height, width } = bufferGeometryConfig;
  const positionOffset = {
    x: 0,
    y: 0,
    z: 0,
  };

  if (centerGeometryToOrigin) {
    positionOffset.x = -(width / 2) * scale;
    positionOffset.y = -(height / 2) * scale;
  }
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

export const setUpSimplePlane = (
  bufferGeometryConfig: DetailedPlaneConfig,
  scale: number,
  centerGeometryToOrigin: boolean
) => {
  const { height, width } = bufferGeometryConfig;
  const positionOffset = {
    x: 0,
    y: 0,
    z: 0,
  };

  if (centerGeometryToOrigin) {
    positionOffset.x = -(width / 2) * scale;
    positionOffset.y = -(height / 2) * scale;
  }
  return {
    geometry: createSimplePlane(width, height),
    positionOffset,
  };
};

const emptyBuffer = () => {
  const bufferGeometry = new BufferGeometry();

  return { geometry: bufferGeometry, positionOffset: { x: 0, y: 0, z: 0 } };
};
