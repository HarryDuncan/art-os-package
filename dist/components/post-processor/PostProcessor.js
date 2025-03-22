"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const postProcessor_consts_1 = require("./postProcessor.consts");
class PostProcessor {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { EffectComposer } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/postprocessing/EffectComposer.js")));
            const { RenderPass } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/postprocessing/RenderPass.js")));
            const renderTarget = new three_1.WebGLRenderTarget(window.innerWidth, window.innerHeight, postProcessor_consts_1.defaultRenderTargetParameters);
            this.renderPass = new RenderPass(this.scene, this.camera);
            this.composer = new EffectComposer(this.renderer, renderTarget);
            this.composer.addPass(this.renderPass);
        });
    }
    render() {
        this.composer.render();
    }
    resize(width, height) {
        this.composer.setSize(width, height);
    }
}
exports.default = PostProcessor;
