import { Material } from "three";
import { MaterialConfig } from "../../config/material/materials.types";
import { Asset } from "../../assets/asset.types";
export declare const getAssetMappedMaterials: (materialConfig: MaterialConfig[], assets: Asset[]) => Material[];
