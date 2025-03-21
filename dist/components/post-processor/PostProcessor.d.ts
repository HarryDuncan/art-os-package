import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer, Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { PostProcessorCamera } from "./postProcessor.types";
export default class PostProcessor extends EffectComposer {
    scene: Scene;
    camera: PostProcessorCamera;
    renderer: WebGLRenderer;
    constructor({ renderer, scene, camera, passes, }: {
        renderer: WebGLRenderer;
        camera: Camera;
        scene: Scene;
        passes?: Pass[];
    });
    bindEvents(): void;
    onResize(): void;
    addPasses(passes: Pass[]): void;
    updateProcessorParams({ camera, scene, passes, }: {
        camera: Camera;
        scene: Scene;
        passes?: Pass[];
    }): void;
}
