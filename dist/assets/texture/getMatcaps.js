import { MATCAP } from "../assets.constants";
export const getMatcaps = (loadedAssets) => loadedAssets.flatMap((asset) => {
    return asset.name.indexOf(MATCAP) !== -1 ? asset : [];
});
