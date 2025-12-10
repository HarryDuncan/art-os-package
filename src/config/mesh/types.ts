import { BufferGeometry, Material, Mesh, Points } from "three";
import { ShaderMaterial } from "../material/types";
import { CUSTOM_BUFFER_GEOMETRY_TYPES } from "./consts";

export type CustomBufferGeometryType =
  keyof typeof CUSTOM_BUFFER_GEOMETRY_TYPES;

export type DetailedPlaneConfig = {
  height: number;
  width: number;
};
export type CustomGeometryConfig = DetailedPlaneConfig | unknown;
export type MeshObject = Mesh<BufferGeometry, Material | Material[]>;
export type ShaderMeshObject = Mesh<BufferGeometry, ShaderMaterial>;
export type ExtendedMesh = MeshObject & { groupId?: string };
export type CustomMesh = (
  | Points<BufferGeometry, Material>
  | Mesh<BufferGeometry>
) & {
  groupId?: string;
};
