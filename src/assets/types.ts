import { MATERIAL_TYPES } from "../config/material/schema/consts";
import { AnimationClip, BufferGeometry, Group, Object3D, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BoundingBox } from "../types/position.types";
import { ASSET_TYPES } from "./consts";

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

export type FallbackData = {
  assetId: string;
  reason: string;
};

export type Asset = {
  guid: string;
  name: string;
  path?: string;
  assetType: AssetType;
  data?: AssetData;
  assetTag?: AssetTag[];
  metaData?: AssetMetaData;
  fileName?: string;
  fallbacks?: FallbackData[];
};
