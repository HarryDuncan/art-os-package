import { BufferGeometry, Material } from "three";
import { Position3d } from "../../utils/three-dimension-space/position/position.types";
export declare const MESH_TYPES: {
    MESH: string;
    POINTS: string;
    NONE: string;
};
export type MeshType = keyof typeof MESH_TYPES;
export type MeshAttributeConfig = {
    meshType: MeshType;
};
export interface FormattedGeometry {
    geometry: BufferGeometry;
    position?: Position3d;
    rotation?: Position3d;
    name?: string;
    groupId?: string;
}
export type MeshConfig = FormattedGeometry & {
    material: Material;
    meshType?: string;
    meshAttributeConfig?: MeshAttributeConfig;
};
export type AssetGeometry = {
    geometry: BufferGeometry;
    name: string;
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
