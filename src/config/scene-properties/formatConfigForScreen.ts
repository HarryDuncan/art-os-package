import { MeshComponentConfig, SceneConfig } from "../config.types";
import { useMemo } from "react";
import { GeometryConfig } from "../../assets/geometry/geometry.types";
import { useWindowState } from "../../compat/window-state/windowStateProvider";
import { Asset } from "../../assets/types";
import { SCREEN_TYPE } from "../../compat/window-state/windowState.consts";
import { FALLBACK_REASONS } from "../../assets/consts";

export const formatConfigForScreen = (
  config: SceneConfig | undefined | null
): SceneConfig | null | undefined => {
  const {
    state: { screenType },
  } = useWindowState();
  return useMemo(() => {
    if (!config || screenType === "DESKTOP") {
      return config;
    }

    const updatedAssets = config.assets?.map((asset) =>
      getFallback(asset, config.assets ?? [], screenType)
    );

    const updatedConfig = {
      ...config,
      assets: updatedAssets,
    };
    return updatedConfig;
  }, [config, screenType]);
};

const mergeMeshConfigs = (
  currentMeshConfigs: MeshComponentConfig[] = [],
  meshesToMerge: Partial<MeshComponentConfig>[] = []
): MeshComponentConfig[] => {
  const currentMeshConfigMap = new Map<string, MeshComponentConfig>();
  currentMeshConfigs.forEach((meshConfig) => {
    currentMeshConfigMap.set(meshConfig.id, meshConfig);
  });

  const mergedMeshConfigs: MeshComponentConfig[] = [];

  meshesToMerge.forEach((meshToMerge) => {
    const currentMeshConfig = currentMeshConfigMap.get(meshToMerge.id ?? "");
    if (currentMeshConfig) {
      const mergedMeshConfig: MeshComponentConfig = {
        ...currentMeshConfig,
        ...meshToMerge,
        rotation: {
          ...(currentMeshConfig.rotation || {}),
          ...(meshToMerge.rotation || {}),
        },
        position: {
          ...(currentMeshConfig.position || {}),
          ...(meshToMerge.position || {}),
        },
        geometryConfig: {
          ...(currentMeshConfig.geometryConfig || {}),
          ...(meshToMerge.geometryConfig || {}),
        } as GeometryConfig,
      };

      mergedMeshConfigs.push(mergedMeshConfig);
    } else {
      mergedMeshConfigs.push(meshToMerge as MeshComponentConfig);
    }
  });
  const mergedMeshConfigMap = new Map<string, MeshComponentConfig>();
  mergedMeshConfigs.forEach((meshConfig) => {
    mergedMeshConfigMap.set(meshConfig.id, meshConfig);
  });

  currentMeshConfigs.forEach((currentMeshConfig) => {
    if (!mergedMeshConfigMap.has(currentMeshConfig.id)) {
      mergedMeshConfigs.push(currentMeshConfig);
    }
  });
  return mergedMeshConfigs;
};

const getFallback = (asset: Asset, allAssets: Asset[], screenType: string) => {
  let fallback = null;
  if (!asset.fallbacks?.length) {
    return asset;
  }
  if (screenType === SCREEN_TYPE.TABLET) {
    fallback = asset.fallbacks.find(
      (fallback) => fallback.reason === FALLBACK_REASONS.TABLET
    );
  } else if (screenType === SCREEN_TYPE.MOBILE) {
    fallback = asset.fallbacks.find(
      (fallback) => fallback.reason === FALLBACK_REASONS.MOBILE
    );
  } else if (screenType === SCREEN_TYPE.DESKTOP) {
    fallback = asset.fallbacks.find(
      (fallback) => fallback.reason === FALLBACK_REASONS.DESKTOP
    );
  }
  if (fallback) {
    const updatedAsset =
      allAssets.find((a) => a.guid === fallback.assetId) ?? asset;
    return {
      ...asset,
      path: updatedAsset.path,
      fileName: updatedAsset.fileName,
    };
  }
  return asset;
};
