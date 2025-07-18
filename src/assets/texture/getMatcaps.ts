import { MATCAP } from "../consts";
import { Asset } from "../types";

export const getMatcaps = (loadedAssets: Asset[]) =>
  loadedAssets.flatMap((asset) => {
    return asset?.name?.indexOf(MATCAP) !== -1 ? asset : [];
  });
