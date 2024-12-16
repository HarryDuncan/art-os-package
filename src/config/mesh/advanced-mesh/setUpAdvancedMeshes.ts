import { AdvancedScene, Asset } from "assets/asset.types";
import { AdvancedMeshConfig } from "./advancedMesh.types";
import { MeshComponentConfig, MeshTransformConfig } from "../../config.types";
import { Group, Material } from "three";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/types";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "utils/three-dimension-space/formatFromConfig";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export const setUpAdvancedMeshes = (
  assets: Asset[],
  meshConfigs: AdvancedMeshConfig[] = [],
  materials: Material[] = [],
  meshTransforms: MeshTransformConfig[] = [],
  attributeConfigs: ShaderAttributeConfig[] = []
) =>
  meshConfigs.flatMap((meshConfig) => {
    const selectedAsset = assets.find(
      (asset) => asset.id === meshConfig.assetId
    );
    if (selectedAsset) {
      const { data } = selectedAsset;
      const { scene, animations } = data as AdvancedScene;

      // format any geometry data to mesh config while still being part of group

      const formattedScene = formatScene(scene, meshConfig);
      formattedScene.animations = animations;
      loopThroughAllChildren(
        formattedScene,
        materials,
        meshTransforms,
        attributeConfigs,
        [meshConfig]
      );
      formattedScene.name = meshConfig.id;

      return formattedScene;
    }
    return [];
  });

const loopThroughAllChildren = (
  data: Group,
  materials: Material[],
  meshTransforms: MeshTransformConfig[],
  attributeConfigs: ShaderAttributeConfig[],
  meshComponentConfigs: MeshComponentConfig[]
) => {
  const { children } = data;
  children.forEach((child) => {
    const { idGroup, isMesh } = child as unknown as {
      idGroup: string | boolean;
      isMesh: boolean;
    };
    if (idGroup || child.children.length > 0) {
      loopThroughAllChildren(
        child as Group,
        materials,
        meshTransforms,
        attributeConfigs,
        meshComponentConfigs
      );
    }
    if (isMesh) {
      // // add any material data to mesh
      // const formattedTransforms = formatMeshAttributes(
      //   meshTransforms ?? [],
      //   attributeConfigs as unknown as ShaderAttributeConfig[]
      // );
      // const shaderMaterial = materials[0];
      // child.material = shaderMaterial;
      // // return group
    }
  });
};

const formatScene = (scene: Group, meshConfig: AdvancedMeshConfig) => {
  const clonedScene = clone(scene);
  const position = formatPositionFromConfig(meshConfig);
  const rotation = formatRotationFromConfig(meshConfig);
  clonedScene.position.set(position.x, position.y, position.z);
  clonedScene.rotation.set(rotation.x, rotation.y, rotation.z);
  const scale = meshConfig.geometryConfig?.scale || 1;
  clonedScene.scale.set(scale, scale, scale);
  return clonedScene as Group;
};
