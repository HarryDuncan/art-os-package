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
          const url = staticContentRootUrl.length
            ? `/${removeElipse(asset.url)}`
            : asset.url;

          return {
            ...asset,
            url: `${staticContentRootUrl}${url}`,
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
