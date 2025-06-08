import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import {
  NodeProps,
  SceneNodeContentProps,
  SceneNodeProps,
} from "../../types/node.types";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { SceneProvider } from "../../context/context";
import { AppendedNodes } from "../appended-nodes/AppendedNodes";
import { useSceneData } from "../../config/useSceneData";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";
import { useThreadWithPostProcessor } from "../../thread/useThreadWithPostProcessor";

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
        events={[]}
        interactionConfig={[]}
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
  interactionConfig = [],
}: SceneNodeContentProps) => {
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
          interactionConfig={sceneConfig?.interactionConfig ?? []}
          events={events}
          sceneData={sceneData}
        />
      )}
    </>
  );
};

const DisplayContent = ({
  sceneFunctions,
  interactionConfig = [],
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
    camera,
    formattedSceneFunctions,
    events,
    animationConfig ?? [],
    meshes,
    lights,
    sceneComponents,
    orbitControls,
    sceneProperties,
    interactionConfig
  );

  useThreadWithPostProcessor(currentFrameRef, camera, renderer);
  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;
