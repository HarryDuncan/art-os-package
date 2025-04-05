import { MATCAP } from "../assets.constants";
import { Asset } from "../../types";

export const getMatcaps = (loadedAssets: Asset[]) =>
  loadedAssets.flatMap((asset) => {
    return asset?.name?.indexOf(MATCAP) !== -1 ? asset : [];
  });
