"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationManager = void 0;
const runAnimation_1 = require("../run-animation/runAnimation");
const setUpAnimationConfig_1 = require("./setUpAnimationConfig");
const animation_constants_1 = require("../animation.constants");
const runCameraAnimation_1 = require("../run-animation/runCameraAnimation");
class AnimationManager {
    constructor(animationConfig) {
        this.sceneElementAnimations = [];
        this.cameraElementAnimations = [];
        this.initializeAnimations(animationConfig);
    }
    initializeAnimations(animations) {
        animations.forEach((animation) => {
            if (this.sceneElementAnimations.findIndex((setAnimation) => setAnimation.animationId === animation.animationId) !== -1) {
                console.warn(`an animation with this animation id ${animation.animationId} already exists`);
            }
            else if (animation.targetIdentifier === animation_constants_1.GENERIC_TARGET_IDENTIFIERS.CAMERA) {
                this.cameraElementAnimations.push(Object.assign(Object.assign({}, animation), { isRunning: false }));
            }
            else {
                this.sceneElementAnimations.push(Object.assign(Object.assign({}, animation), { isRunning: false }));
            }
        });
    }
    startAnimation(scene, animationId) {
        const animation = this.sceneElementAnimations.find((configuredAnimation) => configuredAnimation.animationId === animationId);
        if (!animation) {
            console.warn(`animation: ${animationId} has not been initialized`);
        }
        else if ((animation === null || animation === void 0 ? void 0 : animation.isRunning) === false) {
            const initializedConfig = (0, setUpAnimationConfig_1.setUpAnimationConfig)(animation);
            animation.isRunning = true;
            (0, runAnimation_1.runAnimation)(scene, initializedConfig, animationId);
        }
    }
    hasCameraAnimations() {
        return this.cameraElementAnimations.length > 0;
    }
    startCameraAnimation(camera) {
        // TODO - set up methods for multiple camera animations
        const animation = this.cameraElementAnimations[0];
        if (!animation) {
            console.warn(`no camera animations configured`);
        }
        if (animation.isRunning === false) {
            const initializedAnimationConfig = (0, setUpAnimationConfig_1.setUpAnimationConfig)(animation);
            animation.isRunning = true;
            (0, runCameraAnimation_1.runCameraAnimation)(camera, initializedAnimationConfig);
        }
    }
    stopAnimation(animationId) {
        const animation = this.sceneElementAnimations.find((configuredAnimation) => configuredAnimation.animationId === animationId);
        if (animation) {
            animation.isRunning = false;
        }
    }
}
exports.AnimationManager = AnimationManager;
