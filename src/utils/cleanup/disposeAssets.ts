import { Asset } from "../../assets/types";
import { ASSET_TYPES } from "../../assets/consts";
import { Texture, BufferGeometry, Material, Object3D, Group } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { LoadedGroup } from "../../assets/types";

/**
 * Disposes of Three.js resources from assets
 */
export const disposeAssets = (assets: Asset[] | null | undefined): void => {
  if (!assets) return;

  assets.forEach((asset) => {
    if (!asset.data) return;

    switch (asset.assetType) {
      case ASSET_TYPES.TEXTURE: {
        const texture = asset.data as Texture;
        if (texture && texture.dispose) {
          texture.dispose();
        }
        break;
      }
      case ASSET_TYPES.MODEL3D: {
        const model = asset.data as LoadedGroup | GLTF | Object3D;
        disposeModel(model);
        break;
      }
      case ASSET_TYPES.ADVANCED_3D: {
        const advancedScene = asset.data as { scene: Group; animations: any[] };
        if (advancedScene?.scene) {
          disposeObject3D(advancedScene.scene);
        }
        break;
      }
      case ASSET_TYPES.VIDEO: {
        // Remove video element from DOM
        const video = document.getElementById(asset.guid) as HTMLVideoElement;
        if (video) {
          video.pause();
          video.src = "";
          video.load();
          video.remove();
        }
        break;
      }
      // IMAGE, SVG, FONT don't need disposal as they're not Three.js resources
      default:
        break;
    }
  });
};

/**
 * Disposes of a Three.js model (Group, GLTF, or Object3D)
 */
const disposeModel = (model: LoadedGroup | GLTF | Object3D | null): void => {
  if (!model) return;

  if ("scene" in model && model.scene) {
    // GLTF format
    disposeObject3D(model.scene);
  } else if ("children" in model && Array.isArray(model.children)) {
    // LoadedGroup or Group
    disposeObject3D(model as Object3D);
  } else if (model instanceof Object3D) {
    disposeObject3D(model);
  }
};

/**
 * Recursively disposes of an Object3D and all its children
 */
export const disposeObject3D = (object: Object3D): void => {
  if (!object) return;

  // Dispose of all children first
  while (object.children.length > 0) {
    disposeObject3D(object.children[0]);
    object.remove(object.children[0]);
  }

  // Dispose of geometry
  if ("geometry" in object && object.geometry) {
    const geometry = object.geometry as BufferGeometry;
    if (geometry.dispose) {
      geometry.dispose();
    }
  }

  // Dispose of materials
  if ("material" in object && object.material) {
    const material = object.material as Material | Material[];
    if (Array.isArray(material)) {
      material.forEach((mat) => {
        if (mat && mat.dispose) {
          mat.dispose();
        }
        // Dispose textures in material
        disposeMaterialTextures(mat);
      });
    } else {
      if (material.dispose) {
        material.dispose();
      }
      // Dispose textures in material
      disposeMaterialTextures(material);
    }
  }
};

/**
 * Disposes of textures in a material
 */
const disposeMaterialTextures = (material: Material): void => {
  if (!material) return;

  // List of texture property names that might exist on materials
  const textureProperties = [
    "map",
    "normalMap",
    "bumpMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
    "displacementMap",
    "alphaMap",
    "envMap",
  ];

  textureProperties.forEach((prop) => {
    const texture = (material as any)[prop] as Texture | null;
    if (texture && texture.dispose) {
      texture.dispose();
    }
  });
};
