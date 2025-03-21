import { RefObject } from "react";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
export declare const useThreadWithPostProcessor: (currentFrameRef: RefObject<number>, camera: Camera, renderer: WebGLRenderer, passes: Pass[]) => void;
