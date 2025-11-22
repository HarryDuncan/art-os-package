import { BufferGeometry, Material } from "three";
import { Position3d } from "../../types/position.types";
import { MESH_TYPES } from "../../config/mesh/consts";

export type MeshType = keyof typeof MESH_TYPES;

export type MeshAttributeConfig = {
  meshType: MeshType;
};

export interface FormattedGeometry {
  meshId: string;
  geometry: BufferGeometry;
  assetId: string;
  position?: Position3d;
  rotation?: Position3d;
  groupId?: string;
  materialId?: string;
}
export type MeshConfig = FormattedGeometry & {
  id: string;
  material: Material;
  meshType?: string;
  meshAttributeConfig?: MeshAttributeConfig;
};

export type AssetGeometry = {
  geometry: BufferGeometry;
  name: string;
  assetId: string;
  positionOffset?: Position3d;
};

export type GeometryConfig = {
  scale: number;
  centerMesh?: boolean;
  subdivision?: {
    subdivisionProps?: SubdivisionProps;
    subdevisionIterations?: number;
  };
};

export type SubdivisionProps = {
  split?: boolean;
  uvSmooth?: boolean;
  preserveEdges?: boolean;
  flatOnly?: boolean;
  maxTriangles?: number;
};
