import { JSX, RefObject, useCallback } from "react";
import { WebGLRenderer, CSS3DRenderer } from "three";

type ContainerNode =
  | RefObject<Element>
  | RefObject<null>
  | RefObject<JSX.Element>;

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer | CSS3DRenderer
) => {
  return useCallback(async () => {
    if (containerRef?.current) {
      const container = containerRef.current as HTMLElement;
      const { CSS3DRenderer } = await import(
        "three/examples/jsm/renderers/CSS3DRenderer.js"
      );
      if (renderer instanceof CSS3DRenderer) {
        container.appendChild(renderer.domElement);
      }
    }
  }, [containerRef, renderer]);
};
