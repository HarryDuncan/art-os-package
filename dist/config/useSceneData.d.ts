import { SceneConfig, SceneData } from "./config.types";
import { Asset } from "../assets/asset.types";
export declare const useSceneData: (config: SceneConfig | undefined | null, assets: Asset[], areAssetsInitialized: boolean) => SceneData | null;
