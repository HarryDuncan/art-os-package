import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export const loadGLTF = (path) => new Promise((resolve) => {
    const gltfLoader = new GLTFLoader();
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(path, (gltf) => {
        const result = gltf.scene;
        const { animations } = gltf;
        resolve({ scene: result, animations });
    }, // On Progress
    () => null, 
    // On Error
    (error) => {
        console.error(error);
    });
});
