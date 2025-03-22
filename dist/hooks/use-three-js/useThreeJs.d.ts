/// <reference types="react" />
import { ThreeJsParams } from "../../config/config.types";
export declare const useThreeJs: (threeJsParams: ThreeJsParams) => {
    container: import("react").RefObject<HTMLDivElement>;
    renderer: any;
    camera: any;
    currentFrameRef: import("react").RefObject<number>;
    threeJsInitialized: boolean;
    cssRenderer: Promise<any>;
    orbitControls: Promise<any>;
};
