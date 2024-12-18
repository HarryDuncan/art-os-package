import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "../../hooks/use-thread";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { NodeProps } from "../node.types";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";

const SceneNode = ({
  sceneFunctions,
  animations = [],
  interactionEvents = [],
  events,
  sceneData: {
    threeJsParams,
    lights,
    meshes,
    sceneComponents,
    sceneProperties,
  },
}: NodeProps) => {
  useSetWindowState();
  const { container, renderer, camera, currentFrameRef, orbitControls } =
    useThreeJs(threeJsParams);

  const scene = useInteractiveScene(
    sceneFunctions,
    events,
    animations,
    meshes,
    lights,
    sceneComponents,
    orbitControls,
    sceneProperties,
    interactionEvents
  );

  useThreadWithPostProcessor(currentFrameRef, scene, camera, renderer, []);

  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;
