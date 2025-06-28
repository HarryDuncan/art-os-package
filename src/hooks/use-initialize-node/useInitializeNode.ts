import { JSX, RefObject, useEffect } from "react";
import { WebGLRenderer } from "three";
import { useSceneContext } from "../../context/context";

type ContainerNode =
  | RefObject<Element>
  | RefObject<null>
  | RefObject<JSX.Element>;

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer
) => {
  const { setRendererHeight, setRendererWidth } = useSceneContext();
  useEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current as HTMLElement;
      const existingCanvas = container.querySelector("canvas");
      existingCanvas?.remove();
      container.appendChild(renderer.domElement);
      setRendererHeight(container.clientHeight);
      setRendererWidth(container.clientWidth);
    }
  }, [containerRef, renderer, setRendererHeight, setRendererWidth]);
};
