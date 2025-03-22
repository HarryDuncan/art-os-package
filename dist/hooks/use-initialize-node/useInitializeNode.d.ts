import { JSX, RefObject } from "react";
import { WebGLRenderer, CSS3DRenderer } from "three";
type ContainerNode = RefObject<Element> | RefObject<null> | RefObject<JSX.Element>;
export declare const useInitializeNode: (containerRef: ContainerNode, renderer: WebGLRenderer | CSS3DRenderer) => () => Promise<void>;
export {};
