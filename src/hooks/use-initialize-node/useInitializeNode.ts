import { JSX, RefObject, useEffect } from "react";
import { WebGLRenderer } from "three";

type ContainerNode =
  | RefObject<Element>
  | RefObject<null>
  | RefObject<JSX.Element>;

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer
) =>
  useEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current as HTMLElement;
      container.appendChild(renderer.domElement);
    }
  }, [containerRef, renderer]);
