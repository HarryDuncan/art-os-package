"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveScene = void 0;
const three_1 = require("three");
const AnimationManager_1 = require("../../animation/animation-manager/AnimationManager");
const engine_consts_1 = require("../../engine/engine.consts");
class InteractiveScene extends three_1.Scene {
    constructor(sceneFunctions, eventConfig, animationConfig, interactionEvents) {
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
    addOrbitControls(orbitControls) {
        if (orbitControls) {
            this.orbitControls = orbitControls;
        }
    }
}
exports.InteractiveScene = InteractiveScene;
