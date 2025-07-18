import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import {
  NodeProps,
  SceneNodeContentProps,
  SceneNodeProps,
} from "../node.types";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { SceneProvider } from "../../context/context";
import { useSceneData } from "../../config/useSceneData";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";
import { useThreadWithPostProcessor } from "../../thread/useThreadWithPostProcessor";
import { StatusToolbar } from "../../components/status-toolbar/StatusToolbar";
import { useStatusToolbar } from "../../components/status-toolbar/useStatusToolbar";

export const PreviewNode = ({
  sceneConfig,
  loaderComponent,
}: SceneNodeProps) => (
  <WindowStateProvider>
    <SceneProvider>
      <SceneNodeContent
        sceneConfig={sceneConfig}
        loaderComponent={loaderComponent}
      />
    </SceneProvider>
  </WindowStateProvider>
);

const SceneNodeContent = ({
  sceneConfig,
  loaderComponent,
  sceneFunctions = {},
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
          sceneData={sceneData}
        />
      )}
    </>
  );
};

const DisplayContent = ({
  sceneFunctions,
  interactionConfig = [],
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

  const { container, renderer, currentFrameRef, orbitControls } =
    useThreeJs(threeJsParams);

  const formattedSceneFunctions = useSceneFunctions(sceneFunctions);

  useInteractiveScene(
    formattedSceneFunctions,
    animationConfig ?? [],
    meshes,
    lights,
    sceneComponents,
    orbitControls,
    sceneProperties,
    interactionConfig
  );

  useThreadWithPostProcessor(currentFrameRef, renderer);

  const { isVisible } = useStatusToolbar();

  return (
    <>
      <RootContainer
        containerRef={container}
        sceneProperties={sceneProperties}
      />
      <StatusToolbar isVisible={isVisible} />
    </>
  );
};

export default PreviewNode;
