import { Asset } from "./asset.types";
export declare const useAssets: (assets: Asset[] | undefined | null) => {
    initializedAssets: Asset[];
    areAssetsInitialized: boolean;
};
