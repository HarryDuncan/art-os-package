import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "../../hooks/use-thread";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { NodeProps } from "../node.types";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { SceneProvider } from "../../context/context";
import { AppendedNodes } from "../appended-nodes/AppendedNodes";

const SceneNode = (props: NodeProps) => (
  <SceneProvider>
    <SceneNodeContent {...props} />
    {props.appendedNodes && (
      <AppendedNodes appendedNodes={props.appendedNodes} />
    )}
  </SceneProvider>
);

const SceneNodeContent = ({
  sceneFunctions,
  interactionEvents = [],
  events,
  sceneData: {
    threeJsParams,
    animationConfig,
    lights,
    meshes,
    sceneComponents,
    sceneProperties,
  },
}: NodeProps) => {
  useSetWindowState();
  const { container, renderer, camera, currentFrameRef, orbitControls } =
    useThreeJs(threeJsParams);

  const formattedSceneFunctions = useSceneFunctions(sceneFunctions);

  useInteractiveScene(
    formattedSceneFunctions,
    events,
    animationConfig,
    meshes,
    lights,
    sceneComponents,
    orbitControls,
    sceneProperties,
    interactionEvents
  );

  useThreadWithPostProcessor(currentFrameRef, camera, renderer, []);

  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;
