import { ReactNode } from "react";
import { Asset } from "../../assets/types";
import { useAssets } from "../../assets/useAssets";
import { Loader } from "../../components/loaders/Loader";
import { SceneConfig } from "../../config/config.types";
import { useSceneData } from "../../config/useSceneData";
import { SceneDisplay } from "./SceneDisplay";
import { useSetInteractionConfigs } from "../../interaction/hooks/useSetInteractionConfigs";

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

  return (
    <>
      <Loader loaderComponent={loaderComponent} />
      {areAssetsInitialized && !!initializedAssets && (
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
