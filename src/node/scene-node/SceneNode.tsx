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
import { ExternalInteractionNode } from "../external-interaction-nodes/ExternalInteractionNode";
import { StatusToolbar } from "../../components/status-toolbar/StatusToolbar";
import { useStatusToolbar } from "../../components/status-toolbar/useStatusToolbar";
import { ErrorBoundary } from "../../components/error-boundary";

export const SceneNode = ({
  sceneConfig,
  externalInteractionConfig,
  loaderComponent,
}: SceneNodeProps) => (
  <ErrorBoundary>
    <WindowStateProvider>
      <SceneProvider>
        <SceneNodeContent
          sceneConfig={sceneConfig}
          loaderComponent={loaderComponent}
        />
        {externalInteractionConfig && (
          <ExternalInteractionNode
            externalInteractionConfig={externalInteractionConfig}
          />
        )}
      </SceneProvider>
    </WindowStateProvider>
  </ErrorBoundary>
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

export default SceneNode;
