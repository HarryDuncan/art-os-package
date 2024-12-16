import { JSX, RefObject, useEffect } from "react";
import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

type ContainerNode =
  | RefObject<Element>
  | RefObject<null>
  | RefObject<JSX.Element>;

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer | CSS3DRenderer
) =>
  useEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current as HTMLElement;
      container.appendChild(renderer.domElement);
    }
  }, [containerRef, renderer]);
