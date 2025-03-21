import { TransitionLoopConfig } from "../animationloop.types";
export declare const transitionLoop: (transitionConfig: TransitionLoopConfig | null) => (shaderMesh: Mesh<BufferGeometry, any>, time: number) => any[];
