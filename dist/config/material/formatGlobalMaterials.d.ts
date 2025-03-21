import { Asset } from "../../assets/asset.types";
import { SceneConfig } from "../config.types";
import { Material } from "three";
import { ShaderAttributeConfig } from "./shaders/build-shader/types";
export declare const formatGlobalMaterials: (assets: Asset[], config: SceneConfig) => {
    materials: Material[];
    attributeConfigs: ShaderAttributeConfig[];
};
