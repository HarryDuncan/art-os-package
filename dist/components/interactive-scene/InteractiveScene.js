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
exports.InteractiveScene = void 0;
const three_1 = require("three");
const AnimationManager_1 = require("../../animation/animation-manager/AnimationManager");
const engine_consts_1 = require("../../engine/engine.consts");
class InteractiveScene extends three_1.Scene {
    constructor(sceneFunctions, eventConfig, animationConfig, interactionEvents, sceneProperties, lights) {
        super();
        this.guid = "";
        this.sceneFunctions = sceneFunctions;
        this.clock = new three_1.Clock();
        this.bindExecutionFunctions();
        this.addEvents(eventConfig);
        this.addInteractionEvents(interactionEvents);
        this.orbitControls = null;
        this.animationManager = new AnimationManager_1.AnimationManager(animationConfig);
        this.eventsSet = false;
        this.sceneProperties = sceneProperties;
        this.interactionEvents = interactionEvents.map(({ eventKey, onEvent }) => ({
            eventKey,
            onEvent,
            eventFunction: onEvent,
        }));
        this.lights = lights;
    }
    bindExecutionFunctions() {
        const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
        if (onTimeUpdate) {
            document.addEventListener(engine_consts_1.ENGINE_EVENTS.UPDATE_SCENE, () => onTimeUpdate(this));
        }
        if (onTriggeredUpdate) {
            document.addEventListener(engine_consts_1.ENGINE_EVENTS.TIGGERED_UPDATE, () => onTriggeredUpdate(this));
        }
        // @ts-ignore
        document.addEventListener(engine_consts_1.ENGINE_EVENTS.MESH_ADDED, ({ detail }) => {
            // @ts-ignore
            this.add(detail);
        });
    }
    addInteractionEvents(interactionEvents) {
        interactionEvents.forEach(({ eventKey, onEvent }) => {
            document.addEventListener(eventKey, (e) => {
                const { detail } = e;
                onEvent(this, detail);
            });
        });
    }
    addEvents(eventConfig) {
        if (!this.eventsSet) {
            eventConfig.forEach(({ eventKey, eventFunction }) => {
                switch (eventKey) {
                    case "scroll":
                        this.addOnScrollListener(eventFunction);
                        break;
                    default:
                        window.addEventListener(eventKey, (e) => {
                            eventFunction(this, e);
                        });
                }
            });
        }
    }
    addOnScrollListener(eventFunction) {
        window.addEventListener("scroll", (e) => {
            const { scrollY } = window;
            const event = Object.assign(Object.assign({}, e), { scrollY });
            eventFunction(this, event);
        });
    }
    addAnimations(animations) {
        this.animationManager.initializeAnimations(animations);
    }
    initOrbitControls(camera, renderer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { OrbitControls } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/controls/OrbitControls.js")));
            this.orbitControls = new OrbitControls(camera, renderer.domElement);
        });
    }
}
exports.InteractiveScene = InteractiveScene;
