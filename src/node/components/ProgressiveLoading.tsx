import { ReactNode } from "react";
import { Asset } from "../../assets/types";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { SceneConfig } from "../../config/config.types";
import { useSceneData } from "../../config/useSceneData";
import { SceneDisplay } from "./SceneDisplay";
import { useSetInteractionConfigs } from "../../interaction/hooks/useSetInteractionConfigs";
import { formatConfigForScreen } from "../../config/scene-properties/formatConfigForScreen";
import { useCamera } from "../../config/three-js/use-camera/useCamera";
import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { Camera } from "three";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useWindowState } from "../../compat/window-state/windowStateProvider";
import { VideoStreamNode } from "./video-stream/VideoStreamNode";
import { useSceneContext } from "../../context/context";

export const ProgressiveLoading = ({
  sceneConfig,
  loaderComponent,
  setExternalScene,
  onStatusChange,
}: {
  sceneConfig: SceneConfig;
  loaderComponent: ReactNode;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
  onStatusChange?: (status: string) => void;
}) => {
  useSetWindowState();
  const {
    state: { windowSize },
  } = useWindowState();

  return (
    <>
      <Loader loaderComponent={loaderComponent} />
      {windowSize.width !== 0 && windowSize.height !== 0 && (
        <PostWindowSizeLoader
          loaderComponent={loaderComponent}
          sceneConfig={sceneConfig}
          setExternalScene={setExternalScene}
        />
      )}
    </>
  );
};

const PostWindowSizeLoader = ({
  loaderComponent,
  sceneConfig,
  setExternalScene,
}: {
  loaderComponent: ReactNode;
  sceneConfig: SceneConfig;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
}) => {
  useSetInteractionConfigs(sceneConfig.interactionConfigs ?? []);
  const formattedConfig = formatConfigForScreen(sceneConfig);
  return (
    <>
      <Loader loaderComponent={loaderComponent} />
      {formattedConfig && (
        <SceneLoader
          sceneConfig={formattedConfig}
          setExternalScene={setExternalScene}
        />
      )}
      <VideoStreamNode />
    </>
  );
};

const SceneLoader = ({
  sceneConfig,
  setExternalScene,
}: {
  sceneConfig: SceneConfig;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
}) => {
  const { areAssetsInitialized, assetsRef } = useSceneContext();
  useAssets(sceneConfig.assets, sceneConfig.assetPath);

  useCamera(sceneConfig.cameraConfig, sceneConfig.sceneProperties ?? {});
  return (
    <>
      {areAssetsInitialized && !!assetsRef.current && sceneConfig && (
        <SceneConfigLoader
          sceneConfig={sceneConfig}
          assets={assetsRef.current}
          setExternalScene={setExternalScene}
        />
      )}
    </>
  );
};

const SceneConfigLoader = ({
  sceneConfig,
  assets,
  setExternalScene,
}: {
  sceneConfig: SceneConfig;
  assets: Asset[];
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
}) => {
  const { sceneDataRef } = useSceneContext();
  useSceneData(sceneConfig, assets);
  if (!sceneDataRef.current) return null;
  return (
    <SceneDisplay
      sceneData={sceneDataRef.current}
      setExternalScene={setExternalScene}
    />
  );
};
