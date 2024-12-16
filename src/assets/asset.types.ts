import { MATERIAL_TYPES } from "config/material/materials.consts";
import { AnimationClip, BufferGeometry, Group, Object3D, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BoundingBox } from "utils/three-dimension-space/position/position.types";

export const ASSET_TYPES = {
  ADVANCED_3D: "ADVANCED_3D",
  MODEL3D: "MODEL3D",
  TEXTURE: "TEXTURE",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  FONT: "FONT",
  SVG: "SVG",
  URL: "URL",
};
export const ASSET_TAG = {
  MATERIAL: MATERIAL_TYPES,
};

export type AssetType = keyof typeof ASSET_TYPES;
export type Model = GLTF | Group | Object3D;
export type LoadedObjChild = { geometry: BufferGeometry; name: string };
export type LoadedGroup = Group & { children: LoadedObjChild[] };
export type AdvancedScene = { scene: Group; animations: AnimationClip[] };
export type AssetData =
  | Model
  | Texture
  | HTMLImageElement
  | LoadedGroup
  | AdvancedScene;

export interface AssetMetaData {
  vertexCount: number;
  boundingBox: BoundingBox;
}
export type AssetTag = keyof typeof ASSET_TAG;
export type Asset = {
  id: string;
  name: string;
  url: string;
  assetType: AssetType;
  data?: AssetData;
  assetTag?: AssetTag[];
  metaData?: AssetMetaData;
};
