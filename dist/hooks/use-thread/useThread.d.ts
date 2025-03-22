import { WebGLRenderer } from "three";
import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
export declare const useThread: (renderer: WebGLRenderer | any | undefined, currentFrameRef: React.RefObject<number>, scene: InteractiveScene, camera: Camera) => {
    update: () => Promise<void>;
    pause: () => void;
};
