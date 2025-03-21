import { InteractiveSceneFunctions, SceneInteraction } from "./InteractiveScene";
import { EventConfig } from "../../interaction/interactions.types";
import { AnimationConfig } from "../../animation/animation.types";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneProperties } from "../../config/config.types";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneLight } from "../../config/lights/lights.types";
export declare const useInteractiveScene: (sceneFunction: InteractiveSceneFunctions, eventConfig: EventConfig[], animationConfig: AnimationConfig[], meshes: Object3D[] | GLTF[], lights: SceneLight[], sceneComponents: Object3D[], orbitControls: OrbitControls | null, sceneProperties: SceneProperties, interactionEvents: SceneInteraction[]) => void;
