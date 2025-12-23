import { useEffect } from "react";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import {
  StatusToolbar,
  useStatusToolbar,
} from "../../components/status-toolbar";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { useThread } from "../../thread";
import { NodeProps } from "../node.types";
import { RootContainer } from "../root/root-container";
import { PingPongRenderTargetConfig } from "../../config/post-effects/findPostEffectTransforms";
import { OverlayDisplay } from "../../components/overlays/OverlayDisplay";

export const SceneDisplay = ({
  sceneFunctions,
  sceneData: {
    controlsConfig,

    // lights,
    meshes,
    //sceneComponents,
    sceneProperties,
    postEffects,
    overlays,
  },
  setExternalScene,
}: NodeProps) => {
  const { container, currentFrameRef, orbitControls } = useThreeJs(
    controlsConfig,
    sceneProperties
  );

  const formattedSceneFunctions = useSceneFunctions(sceneFunctions);

  useInteractiveScene(
    formattedSceneFunctions,
    meshes,
    // lights,
    orbitControls,
    sceneProperties
  );

  useThread(
    currentFrameRef,

    postEffects as PingPongRenderTargetConfig[],
    setExternalScene
  );

  // // Cleanup on unmount
  // useEffect(() => {
  //   return () => {
  //     // Dispose of the scene
  //     if (initializedScene.current) {
  //       initializedScene.current.dispose();
  //       initializedScene.current = null;
  //     }
  //   };
  // }, [initializedScene]);

  const { isVisible } = useStatusToolbar();

  return (
    <>
      <OverlayDisplay overlays={overlays} />
      <RootContainer
        containerRef={container}
        sceneProperties={sceneProperties}
      />
      <StatusToolbar isVisible={isVisible} />
    </>
  );
};
