import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import {
  StatusToolbar,
  useStatusToolbar,
} from "../../components/status-toolbar";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { useThread } from "../../thread";
import { ExternalInteractionNode } from "../external-interaction-nodes/ExternalInteractionNode";
import { NodeProps } from "../node.types";
import { RootContainer } from "../root/root-container";
import { PingPongRenderTargetConfig } from "../../config/post-effects/findPostEffectTransforms";
import { OverlayDisplay } from "../../components/overlays/OverlayDisplay";

export const SceneDisplay = ({
  sceneFunctions,
  sceneData: {
    controlsConfig,
    animationConfig,
    lights,
    meshes,
    //sceneComponents,
    sceneProperties,
    postEffects,
    overlays,
  },
}: NodeProps) => {
  useSetWindowState();

  const { container, renderer, currentFrameRef, orbitControls } =
    useThreeJs(controlsConfig);

  const formattedSceneFunctions = useSceneFunctions(sceneFunctions);

  useInteractiveScene(
    formattedSceneFunctions,
    animationConfig ?? [],
    meshes,
    lights,
    //    sceneComponents,
    orbitControls,
    sceneProperties
  );

  useThread(
    currentFrameRef,
    renderer,
    postEffects as PingPongRenderTargetConfig[]
  );

  const { isVisible } = useStatusToolbar();

  return (
    <>
      <OverlayDisplay overlays={overlays} />
      <RootContainer
        containerRef={container}
        sceneProperties={sceneProperties}
      />
      <StatusToolbar isVisible={isVisible} />
      <ExternalInteractionNode />
    </>
  );
};
