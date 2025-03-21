import { Clock, Scene } from "three";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { ENGINE_EVENTS } from "../../engine/engine.consts";
export class InteractiveScene extends Scene {
    constructor(sceneFunctions, eventConfig, animationConfig, interactionEvents) {
        super();
        this.guid = "";
        this.sceneFunctions = sceneFunctions;
        this.clock = new Clock();
        this.bindExecutionFunctions();
        this.addEvents(eventConfig);
        this.addInteractionEvents(interactionEvents);
        this.orbitControls = null;
        this.animationManager = new AnimationManager(animationConfig);
        this.eventsSet = false;
    }
    bindExecutionFunctions() {
        const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
        if (onTimeUpdate) {
            document.addEventListener(ENGINE_EVENTS.UPDATE_SCENE, () => onTimeUpdate(this));
        }
        if (onTriggeredUpdate) {
            document.addEventListener(ENGINE_EVENTS.TIGGERED_UPDATE, () => onTriggeredUpdate(this));
        }
        // @ts-ignore
        document.addEventListener(ENGINE_EVENTS.MESH_ADDED, ({ detail }) => {
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
