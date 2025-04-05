import { useMemo } from "react";
import { SceneConfig } from "../../config/config.types";

export const useAssetLocation = (
  configData: SceneConfig[] | null,
  staticContentRootUrl: string = ""
): SceneConfig[] | undefined => {
  return useMemo(
    () =>
      configData?.map((config) => {
        const updatedAssets = config.assets?.map((asset) => {
          const path = staticContentRootUrl.length
            ? `/${removeElipse(asset.path ?? "")}`
            : asset.path;

          return {
            ...asset,
            path: `${staticContentRootUrl}${path}`,
          };
        });
        return {
          ...config,
          assets: updatedAssets,
        };
      }),
    [staticContentRootUrl, configData]
  );
};

const removeElipse = (inputString: string) =>
  inputString.replace(/\.\.\//g, "");
