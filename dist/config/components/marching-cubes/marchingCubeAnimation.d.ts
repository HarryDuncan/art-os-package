import { InteractiveScene } from "../../../components/interactive-scene/InteractiveScene";
import { Object3D } from "three";
export declare const animateMarchingCube: (scene: InteractiveScene) => void;
export declare const updateCubes: (object: Object3D, time: number, numblobs: number) => void;
export declare const createMarchingCubeAnimation: (resolution: number, isolation: number) => Promise<Object3D>;
