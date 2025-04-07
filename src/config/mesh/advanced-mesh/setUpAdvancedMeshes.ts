import { AdvancedMeshConfig } from "./advancedMesh.types";
import {
  MeshComponentConfig,
  MeshTransformConfig,
} from "../../../types/config.types";
import { Group, Material, Object3D } from "three";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/types";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "../../../utils/three-dimension-space/formatFromConfig";
import { getMeshesFromConfig } from "../getMeshesFromConfig";

export const setUpAdvancedMeshes = async (
  config: AdvancedMeshConfig,
  meshes: Object3D[]
) => {
  // @ts-ignore
  const { clone } = await import("three/examples/jsm/utils/SkeletonUtils.js");
  const result = new Group();
  // @ts-ignore
  const meshConfigs = config.meshConfigs;
  // @ts-ignore
  const meshResults = await getMeshesFromConfig(meshConfigs);
  // @ts-ignore
  meshResults.forEach((mesh) => {
    // @ts-ignore
    const clonedMesh = clone(mesh);
    // @ts-ignore
    result.add(clonedMesh);
  });
  return result;
};

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
  // @ts-ignore
  const clonedScene = clone(scene);
  const position = formatPositionFromConfig(meshConfig);
  const rotation = formatRotationFromConfig(meshConfig);
  clonedScene.position.set(position.x, position.y, position.z);
  clonedScene.rotation.set(rotation.x, rotation.y, rotation.z);
  const scale = meshConfig.geometryConfig?.scale || 1;
  clonedScene.scale.set(scale, scale, scale);
  return clonedScene as Group;
};
