import { JSX, RefObject, useEffect } from "react";
import { WebGLRenderer } from "three";
import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";

type ContainerNode =
  | RefObject<Element>
  | RefObject<null>
  | RefObject<JSX.Element>;

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer | null
) => {
  const { setRendererHeight, setRendererWidth, setStatus } = useSceneContext();
  useEffect(() => {
    if (containerRef?.current && renderer) {
      const container = containerRef.current as HTMLElement;
      const existingCanvas = container.querySelector("canvas");
      existingCanvas?.remove();
      container.appendChild(renderer.domElement);
      setRendererHeight(container.clientHeight);
      setRendererWidth(container.clientWidth);
      setStatus(PROCESS_STATUS.INITIALIZING_SCENE);
    }
  }, [containerRef, renderer, setRendererHeight, setRendererWidth, setStatus]);
};
