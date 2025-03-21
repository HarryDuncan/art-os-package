import { Camera } from "three";
import { AnimatedScene, AnimationConfig } from "../animation.types";
export declare class AnimationManager {
    sceneElementAnimations: AnimationConfig[];
    cameraElementAnimations: AnimationConfig[];
    constructor(animationConfig: AnimationConfig[]);
    initializeAnimations(animations: AnimationConfig[]): void;
    startAnimation(scene: AnimatedScene, animationId: string): void;
    hasCameraAnimations(): boolean;
    startCameraAnimation(camera: Camera): void;
    stopAnimation(animationId: string): void;
}
