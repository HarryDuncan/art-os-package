import { useCallback, useEffect } from "react";
import { Asset } from "../types";
import { useSceneContext } from "../../context/context";
import { loadRawWebglAsset } from "./loadRawWebglAsset";

import { packageConsole } from "../../utils/packageConsole";
export const useRawWebglAssets = (
  assets: Asset[] | undefined | null,
  assetPath?: string,
) => {
  const { setAreAssetsInitialized, setInitializedAssets } = useSceneContext();

  const initializeAssets = useCallback(async () => {
    if (!assets) return [];
    return Promise.all(
      assets.map(async (asset) => {
        if (!asset || !asset.path) {
          packageConsole.warn(
            `asset ${asset?.guid} not properly loaded - missing path`,
          );
        }
        const formattedAsset = assetPath
          ? { ...asset, path: `${assetPath}/${asset.fileName}` }
          : asset;
        const data = await loadRawWebglAsset(formattedAsset);
        if (!data) {
          packageConsole.warn(`asset ${formattedAsset.path} not properly loaded`);
        }
        return { ...formattedAsset, data } as Asset;
      }),
    );
  }, [assets, assetPath]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const loaded = await initializeAssets();
      if (isMounted) {
        setAreAssetsInitialized(true);
        setInitializedAssets(loaded ?? []);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [assets, initializeAssets]);
};
