import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import {
  StatusToolbar,
  useStatusToolbar,
} from "../../components/status-toolbar";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { useThreadWithPostProcessor } from "../../thread";
import { ExternalInteractionNode } from "../external-interaction-nodes/ExternalInteractionNode";
import { NodeProps } from "../node.types";
import { RootContainer } from "../root/root-container";

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

  useThreadWithPostProcessor(currentFrameRef, renderer, postEffects);

  const { isVisible } = useStatusToolbar();

  return (
    <>
      <RootContainer
        containerRef={container}
        sceneProperties={sceneProperties}
      />
      <StatusToolbar isVisible={isVisible} />
      <ExternalInteractionNode />
    </>
  );
};
