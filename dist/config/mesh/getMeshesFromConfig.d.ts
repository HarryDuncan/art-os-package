import { Material, Object3D } from "three";
import { Asset } from "../../assets/asset.types";
import { SceneConfig } from "../config.types";
import { ShaderAttributeConfig } from "../material/shaders/build-shader/types";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export declare const getMeshesFromConfig: (assets: Asset[], materials: Material[], config: SceneConfig, attributeConfigs: ShaderAttributeConfig[]) => Object3D[] | GLTF[];
