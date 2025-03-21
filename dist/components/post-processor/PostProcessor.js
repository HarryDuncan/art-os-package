import { WebGLRenderTarget } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer, } from "three/examples/jsm/postprocessing/EffectComposer";
import { defaultRenderTargetParameters } from "./postProcessor.consts";
export default class PostProcessor extends EffectComposer {
    constructor({ renderer, scene, camera, passes = [], }) {
        const renderTarget = new WebGLRenderTarget(window.innerHeight, window.outerHeight, defaultRenderTargetParameters);
        super(renderer, renderTarget);
        this.scene = scene;
        this.camera = camera;
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
    addPasses(passes) {
        const renderPass = new RenderPass(this.scene, this.camera);
        // @ts-ignore
        this.addPass(renderPass);
    }
    updateProcessorParams({ camera, scene, passes = [], }) {
        this.camera = camera;
        this.scene = scene;
        this.addPasses(passes);
    }
}
