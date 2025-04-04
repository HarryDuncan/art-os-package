import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "../../hooks/use-thread";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { NodeProps, SceneNodeProps } from "../node.types";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { SceneProvider } from "../../context/context";
import { AppendedNodes } from "../appended-nodes/AppendedNodes";
import { useSceneData } from "../../config/useSceneData";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";

export const SceneNode = ({
  sceneConfig,
  appendedNodes,
  loaderComponent,
}: SceneNodeProps) => (
  <WindowStateProvider>
    <SceneProvider>
      <SceneNodeContent
        sceneConfig={sceneConfig}
        loaderComponent={loaderComponent}
      />
      {appendedNodes && <AppendedNodes appendedNodes={appendedNodes} />}
    </SceneProvider>
  </WindowStateProvider>
);

const SceneNodeContent = ({
  sceneConfig,
  loaderComponent,
  sceneFunctions = {},
  events = [],
  interactionEvents = [],
}) => {
  const { areAssetsInitialized, initializedAssets } = useAssets(
    sceneConfig.assets,
    sceneConfig.assetPath
  );
  const sceneData = useSceneData(
    sceneConfig,
    initializedAssets,
    areAssetsInitialized
  );

  return (
    <>
      <Loader loaderComponent={loaderComponent} />
      {sceneData && (
        <DisplayContent
          sceneFunctions={sceneFunctions}
          interactionEvents={interactionEvents}
          events={events}
          sceneData={sceneData}
        />
      )}
    </>
  );
};

const DisplayContent = ({
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

  useThreadWithPostProcessor(currentFrameRef, camera, renderer);
  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;
