import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import { PostProcessorCamera } from "./postProcessor.types";
import { defaultRenderTargetParameters } from "./postProcessor.consts";
import { InteractiveScene } from "../interactive-scene/InteractiveScene";

export default class PostProcessor {
  private composer: unknown;
  private renderPass: unknown;
  private camera: PostProcessorCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private initialized = false;
  constructor(
    camera: PostProcessorCamera,
    scene: Scene,
    renderer: WebGLRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
  }

  async init() {
    const { EffectComposer } = await import(
      "three/examples/jsm/postprocessing/EffectComposer.js"
    );
    const { RenderPass } = await import(
      "three/examples/jsm/postprocessing/RenderPass.js"
    );

    const renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      defaultRenderTargetParameters
    );
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer = new EffectComposer(this.renderer, renderTarget);
    // @ts-expect-error - three.js types are not correct
    this.composer.addPass(this.renderPass);
    this.initialized = true;
    return this.initialized;
  }

  isInitialized() {
    return this.initialized;
  }

  render() {
    // @ts-expect-error - three.js types are not correct
    this.composer.render();
  }

  vrRender(scene: InteractiveScene, camera: Camera) {
    // @ts-expect-error - three.js types are not correct
    this.composer.render(scene, camera);
  }

  resize(width: number, height: number) {
    // @ts-expect-error - three.js types are not correct
    this.composer.setSize(width, height);
  }
}
