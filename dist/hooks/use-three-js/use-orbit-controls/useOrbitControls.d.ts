import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ControlConfig } from "../../../config/config.types";
export declare const useOrbitControls: (camera: Camera, renderer: WebGLRenderer | CSS3DRenderer, config?: Partial<ControlConfig>) => any;
