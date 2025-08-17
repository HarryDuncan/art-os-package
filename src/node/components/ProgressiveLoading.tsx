import { ReactNode } from "react";
import { Asset } from "../../assets/types";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { SceneConfig } from "../../config/config.types";
import { useSceneData } from "../../config/useSceneData";
import { SceneDisplay } from "./SceneDisplay";
import { useSetInteractionConfigs } from "../../interaction/hooks/useSetInteractionConfigs";
import { useScreenSizeProperties } from "../../config/scene-properties/useScreenSizeProperties";
import { useCamera } from "../../config/three-js/use-camera/useCamera";

export const ProgressiveLoading = ({
  sceneConfig,
  loaderComponent,
}: {
  sceneConfig: SceneConfig;
  loaderComponent: ReactNode;
}) => {
  useSetInteractionConfigs(sceneConfig.interactionConfigs ?? []);
  const { areAssetsInitialized, initializedAssets } = useAssets(
    sceneConfig.assets,
    sceneConfig.assetPath
  );
  const formattedConfig = useScreenSizeProperties(sceneConfig);
  useCamera(formattedConfig?.cameraConfig);
  return (
    <>
      <Loader loaderComponent={loaderComponent} />
      {areAssetsInitialized && !!initializedAssets && formattedConfig && (
        <SceneConfigLoader
          sceneConfig={sceneConfig}
          assets={initializedAssets}
        />
      )}
    </>
  );
};

const SceneConfigLoader = ({
  sceneConfig,
  assets,
}: {
  sceneConfig: SceneConfig;
  assets: Asset[];
}) => {
  const sceneData = useSceneData(sceneConfig, assets);
  if (!sceneData) return null;
  return <SceneDisplay sceneData={sceneData} />;
};
