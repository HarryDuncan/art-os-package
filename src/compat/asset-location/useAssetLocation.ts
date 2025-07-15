import { useMemo } from "react";
import { SceneConfig } from "../../types/config.types";

export const useAssetLocation = (
  configData: SceneConfig | null,
  staticContentRootUrl: string = ""
): SceneConfig | undefined => {
  return useMemo(() => {
    if (!configData) return undefined;
    const updatedAssets = configData.assets?.map((asset) => {
      const path = staticContentRootUrl.length
        ? `/${removeElipse(asset.path ?? "")}`
        : asset.path;

      return {
        ...asset,
        path: `${staticContentRootUrl}${path}`,
      };
    });
    return {
      ...configData,
      assets: updatedAssets,
    };
  }, [staticContentRootUrl, configData]);
};

const removeElipse = (inputString: string) =>
  inputString.replace(/\.\.\//g, "");
