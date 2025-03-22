import { AnimationClip, Group } from "three";

export const loadGLTF = async (path: string) =>
  new Promise(async (resolve: (value: Group) => void) => {
    const { DRACOLoader } = await import(
      "three/examples/jsm/loaders/DRACOLoader.js"
    );
    const { GLTFLoader } = await import(
      "three/examples/jsm/loaders/GLTFLoader.js"
    );
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(path, (gltf) => {
      resolve(gltf.scene);
    });
  });
