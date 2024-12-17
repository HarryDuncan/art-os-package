import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer";
import { PostProcessorCamera } from "./postProcessor.types";
import { defaultRenderTargetParameters } from "./postProcessor.consts";

export default class PostProcessor extends EffectComposer {
  scene: Scene;

  camera: PostProcessorCamera;

  renderer: WebGLRenderer;

  constructor({
    renderer,
    scene,
    camera,
    passes = [],
  }: {
    renderer: WebGLRenderer;
    camera: Camera;
    scene: Scene;
    passes?: Pass[];
  }) {
    const renderTarget = new WebGLRenderTarget(
      window.innerHeight,
      window.outerHeight,
      defaultRenderTargetParameters
    );

    super(renderer, renderTarget);
    this.scene = scene;
    this.camera = camera as PostProcessorCamera;
    this.renderer = renderer;
    this.addPasses(passes);
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addPasses(passes: Pass[]) {
    const renderPass = new RenderPass(this.scene, this.camera);
    // this.addPasses([renderPass, ...passes]);
  }

  updateProcessorParams({
    camera,
    scene,
    passes = [],
  }: {
    camera: Camera;
    scene: Scene;
    passes?: Pass[];
  }) {
    this.camera = camera as PostProcessorCamera;
    this.scene = scene;
    this.addPasses(passes);
  }
}
