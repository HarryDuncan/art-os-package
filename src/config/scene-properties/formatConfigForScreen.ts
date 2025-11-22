import { SceneConfig } from "../config.types";
import { useMemo } from "react";
import { useWindowState } from "../../compat/window-state/windowStateProvider";
import { Asset } from "../../assets/types";
import { SCREEN_TYPE } from "../../compat/window-state/windowState.consts";
import { FALLBACK_REASONS } from "../../assets/consts";
import { MaterialConfig } from "../material/types";
import { MATERIAL_TYPES } from "../material/schema";
import { ScreenType } from "../../compat/window-state/types";
import { CameraConfig } from "../three-js/use-camera/camera.types";

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

    const updatedMaterialConfigs = config.sceneMaterialConfigs?.map(
      (materialConfig) => updateMaterialConfig(materialConfig, screenType)
    );
    const updatedCameraConfig = updateCameraConfig(
      config.cameraConfig,
      screenType
    );
    return {
      ...config,
      assets: updatedAssets,
      sceneMaterialConfigs: updatedMaterialConfigs,
      cameraConfig: updatedCameraConfig,
    };
  }, [config, screenType]);
};

// const mergeMeshConfigs = (
//   currentMeshConfigs: MeshComponentConfig[] = [],
//   meshesToMerge: Partial<MeshComponentConfig>[] = []
// ): MeshComponentConfig[] => {
//   const currentMeshConfigMap = new Map<string, MeshComponentConfig>();
//   currentMeshConfigs.forEach((meshConfig) => {
//     currentMeshConfigMap.set(meshConfig.id, meshConfig);
//   });

//   const mergedMeshConfigs: MeshComponentConfig[] = [];

//   meshesToMerge.forEach((meshToMerge) => {
//     const currentMeshConfig = currentMeshConfigMap.get(meshToMerge.id ?? "");
//     if (currentMeshConfig) {
//       const mergedMeshConfig: MeshComponentConfig = {
//         ...currentMeshConfig,
//         ...meshToMerge,
//         rotation: {
//           ...(currentMeshConfig.rotation || {}),
//           ...(meshToMerge.rotation || {}),
//         },
//         position: {
//           ...(currentMeshConfig.position || {}),
//           ...(meshToMerge.position || {}),
//         },
//         geometryConfig: {
//           ...(currentMeshConfig.geometryConfig || {}),
//           ...(meshToMerge.geometryConfig || {}),
//         } as GeometryConfig,
//       };

//       mergedMeshConfigs.push(mergedMeshConfig);
//     } else {
//       mergedMeshConfigs.push(meshToMerge as MeshComponentConfig);
//     }
//   });
//   const mergedMeshConfigMap = new Map<string, MeshComponentConfig>();
//   mergedMeshConfigs.forEach((meshConfig) => {
//     mergedMeshConfigMap.set(meshConfig.id, meshConfig);
//   });

//   currentMeshConfigs.forEach((currentMeshConfig) => {
//     if (!mergedMeshConfigMap.has(currentMeshConfig.id)) {
//       mergedMeshConfigs.push(currentMeshConfig);
//     }
//   });
//   return mergedMeshConfigs;
// };

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

const updateMaterialConfig = (
  materialConfig: MaterialConfig,
  screenType: string
) => {
  if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
    const { parameterConfigs } = materialConfig;
    const updatedParameterConfigs = parameterConfigs?.map((parameterConfig) => {
      const { screenSizeAdjustment } = parameterConfig;
      const updatedValue = screenSizeAdjustment?.[screenType as ScreenType];
      if (updatedValue) {
        return {
          ...parameterConfig,
          value: updatedValue,
        };
      }
      return parameterConfig;
    });
    return {
      ...materialConfig,
      parameterConfigs: updatedParameterConfigs,
    };
  }
  return materialConfig;
};

const updateCameraConfig = (
  cameraConfig: CameraConfig | undefined,
  screenType: string
) => {
  if (!cameraConfig) {
    return cameraConfig;
  }
  const { position, screenSizeAdjustment } = cameraConfig;
  const updatedPosition =
    screenSizeAdjustment?.[screenType as ScreenType]?.position ?? position;
  return {
    ...cameraConfig,
    position: updatedPosition,
  };
};
