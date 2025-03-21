import { Asset } from "../../../assets/asset.types";
import { AdvancedMeshConfig } from "./advancedMesh.types";
import { MeshTransformConfig } from "../../config.types";
import { Material } from "three";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/types";
export declare const setUpAdvancedMeshes: (assets: Asset[], meshConfigs?: AdvancedMeshConfig[], materials?: Material[], meshTransforms?: MeshTransformConfig[], attributeConfigs?: ShaderAttributeConfig[]) => any[];
