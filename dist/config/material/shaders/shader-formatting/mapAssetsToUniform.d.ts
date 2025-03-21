import { Asset } from "../../../../assets/asset.types";
import { UniformObject } from "../build-shader/types";
import { AssetToUniformMappingConfig } from "../../../../config/material/materials.types";
export declare const mapAssetsToUniforms: (assetMapping: AssetToUniformMappingConfig[], assets: Asset[], uniforms?: UniformObject) => UniformObject;
