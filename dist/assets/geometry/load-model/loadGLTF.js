"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGLTF = void 0;
const DRACOLoader_1 = require("three/examples/jsm/loaders/DRACOLoader");
const GLTFLoader_1 = require("three/examples/jsm/loaders/GLTFLoader");
const loadGLTF = (path) => new Promise((resolve) => {
    const gltfLoader = new GLTFLoader_1.GLTFLoader();
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader_1.DRACOLoader();
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
exports.loadGLTF = loadGLTF;
