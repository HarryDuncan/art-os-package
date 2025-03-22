import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import { PostProcessorCamera } from "./postProcessor.types";
import { defaultRenderTargetParameters } from "./postProcessor.consts";

export default class PostProcessor {
  private composer: any;
  private renderPass: any;
  private camera: PostProcessorCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;

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
    this.composer.addPass(this.renderPass);
  }

  render() {
    this.composer.render();
  }

  resize(width: number, height: number) {
    this.composer.setSize(width, height);
  }
}
