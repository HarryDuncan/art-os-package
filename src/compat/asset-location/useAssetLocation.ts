import { useMemo } from "react";
import { SceneConfig } from "config/config.types";

export const useAssetLocation = (
  configData: SceneConfig[] | null
): SceneConfig[] | undefined => {
  const staticContentRootUrl = useContentUrl();
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

export const useContentUrl = () =>
  useMemo(() => {
    if (process.env.NEXT_PUBLIC_CONTENT_ROOT) {
      return process.env.NEXT_PUBLIC_CONTENT_ROOT;
    }
    return "";
  }, []);

const removeElipse = (inputString: string) =>
  inputString.replace(/\.\.\//g, "");
