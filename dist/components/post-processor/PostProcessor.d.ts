import { Scene, WebGLRenderer } from "three";
import { PostProcessorCamera } from "./postProcessor.types";
export default class PostProcessor {
    private composer;
    private renderPass;
    private camera;
    private scene;
    private renderer;
    constructor(camera: PostProcessorCamera, scene: Scene, renderer: WebGLRenderer);
    init(): Promise<void>;
    render(): void;
    resize(width: number, height: number): void;
}
