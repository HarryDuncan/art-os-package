import { IUniform } from "three";
import { Asset } from "../../../../assets/asset.types";
import { UniformObject } from "../build-shader/types";
import { AssetToUniformMappingConfig } from "../../../../config/material/materials.types";
export declare const formatBuiltShaderUniforms: (uniforms: UniformObject, assetMapping: AssetToUniformMappingConfig[], assets: Asset[]) => {
    [uniform: string]: IUniform<unknown>;
};
