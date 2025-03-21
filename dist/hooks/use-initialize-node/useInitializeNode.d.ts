import { JSX, RefObject } from "react";
import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
type ContainerNode = RefObject<Element> | RefObject<null> | RefObject<JSX.Element>;
export declare const useInitializeNode: (containerRef: ContainerNode, renderer: WebGLRenderer | CSS3DRenderer) => void;
export {};
