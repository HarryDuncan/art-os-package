import { AnimationClip, BufferGeometry, Group, Object3D, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BoundingBox } from "../utils/three-dimension-space/position/position.types";
export declare const ASSET_TYPES: {
    ADVANCED_3D: string;
    MODEL3D: string;
    TEXTURE: string;
    IMAGE: string;
    VIDEO: string;
    FONT: string;
    SVG: string;
    URL: string;
};
export declare const ASSET_TAG: {
    MATERIAL: {
        INTERACTIVE_SHADER: string;
        SHADER: string;
        MATCAP: string;
        VIDEO: string;
        ENV_MAP: string;
        STANDARD: string;
        PHONG: string;
        MATERIAL: string;
        BUILT_SHADER: string;
    };
};
export type AssetType = keyof typeof ASSET_TYPES;
export type Model = GLTF | Group | Object3D;
export type LoadedObjChild = {
    geometry: BufferGeometry;
    name: string;
};
export type LoadedGroup = Group & {
    children: LoadedObjChild[];
};
export type AdvancedScene = {
    scene: Group;
    animations: AnimationClip[];
};
export type AssetData = Model | Texture | HTMLImageElement | LoadedGroup | AdvancedScene;
export interface AssetMetaData {
    vertexCount: number;
    boundingBox: BoundingBox;
}
export type AssetTag = keyof typeof ASSET_TAG;
export type Asset = {
    id: string;
    path: string;
    assetType: AssetType;
    name?: string;
    data?: AssetData;
    assetTag?: AssetTag[];
    metaData?: AssetMetaData;
};
