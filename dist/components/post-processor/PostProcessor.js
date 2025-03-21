"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const RenderPass_1 = require("three/examples/jsm/postprocessing/RenderPass");
const EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
const postProcessor_consts_1 = require("./postProcessor.consts");
class PostProcessor extends EffectComposer_1.EffectComposer {
    constructor({ renderer, scene, camera, passes = [], }) {
        const renderTarget = new three_1.WebGLRenderTarget(window.innerHeight, window.outerHeight, postProcessor_consts_1.defaultRenderTargetParameters);
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
        const renderPass = new RenderPass_1.RenderPass(this.scene, this.camera);
        // @ts-ignore
        this.addPass(renderPass);
    }
    updateProcessorParams({ camera, scene, passes = [], }) {
        this.camera = camera;
        this.scene = scene;
        this.addPasses(passes);
    }
}
exports.default = PostProcessor;
