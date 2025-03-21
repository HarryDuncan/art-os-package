import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
export declare const useThread: (renderer: WebGLRenderer | CSS3DRenderer | undefined, currentFrameRef: React.RefObject<number>, scene: InteractiveScene, camera: Camera) => {
    update: () => void;
    pause: () => void;
};
