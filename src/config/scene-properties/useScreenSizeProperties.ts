import { ScreenType } from "compat/window-state/types";
import {
  MeshComponentConfig,
  SceneConfig,
  ThreeJSConfig,
} from "../config.types";
import { useMemo } from "react";
import { GeometryConfig } from "assets/geometry/geometry.types";

export const useScreenSizeProperties = (
  config: SceneConfig | undefined | null,
  currentScreenType: ScreenType
): SceneConfig | null | undefined =>
  useMemo(() => {
    if (!config || currentScreenType === "DESKTOP") {
      return config;
    }
    const { screenSizeAdjustments } = config;

    if (!screenSizeAdjustments || !screenSizeAdjustments.length) {
      return config;
    }
    const currentAdjustment = screenSizeAdjustments.find(
      ({ screenType }) => screenType === currentScreenType
    );
    if (!currentAdjustment) {
      return config;
    }

    const threeJsConfig = mergeThreeJsConfig(
      config.threeJsConfig,
      currentAdjustment?.threeJsConfig
    );

    const meshComponentConfigs = mergeMeshConfigs(
      config.meshComponentConfigs,
      currentAdjustment.meshComponentConfigs
    );
    const updatedConfig = {
      ...config,
      meshComponentConfigs,
      threeJsConfig,
    };
    return updatedConfig;
  }, [config, currentScreenType]);

const mergeThreeJsConfig = (
  currentConfig: ThreeJSConfig,
  adjustedConfig: ThreeJSConfig
) => {
  if (!adjustedConfig) return currentConfig;
  return { ...currentConfig, ...adjustedConfig };
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
