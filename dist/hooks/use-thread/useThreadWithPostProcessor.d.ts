import { RefObject } from "react";
export declare const useThreadWithPostProcessor: (currentFrameRef: RefObject<number>, camera: Camera, renderer: WebGLRenderer, passes: any[]) => {
    update: () => Promise<() => void>;
    pause: () => void;
};
