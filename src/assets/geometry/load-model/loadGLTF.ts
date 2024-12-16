import { AnimationClip, Group } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadGLTF = (path: string) =>
  new Promise(
    (
      resolve: (value: { scene: Group; animations: AnimationClip[] }) => void
    ) => {
      const gltfLoader = new GLTFLoader();
      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(
        path,
        (gltf: GLTF) => {
          const result = gltf.scene;
          const { animations } = gltf;
          resolve({ scene: result, animations });
        }, // On Progress
        () => null,
        // On Error
        (error) => {
          console.error(error);
        }
      );
    }
  );
