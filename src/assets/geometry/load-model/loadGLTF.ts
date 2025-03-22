import { GLTF } from "src/assets/asset.types";
import { Group } from "three";

export const loadGLTF = async (url: string): Promise<GLTF> => {
  const { DRACOLoader } = await import(
    "three/examples/jsm/loaders/DRACOLoader.js"
  );
  const { GLTFLoader } = await import(
    "three/examples/jsm/loaders/GLTFLoader.js"
  );

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
