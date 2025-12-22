import { Asset } from "../../assets/types";
import { SceneProperties } from "../config.types";

const assetMappedScenePropertyKeys = ["backgroundUrl", "videoBackground"];
export const formatSceneProperties = (
  sceneProperties: SceneProperties,
  assets: Asset[]
) => {
  const updatedSceneProperties = { ...sceneProperties };
  assetMappedScenePropertyKeys.forEach((key) => {
    if (!updatedSceneProperties[key as keyof SceneProperties]) return;
    const asset = assets.find(
      (asset) =>
        asset.guid === updatedSceneProperties[key as keyof SceneProperties]
    );
    if (asset) {
      // @ts-ignore
      updatedSceneProperties[key as keyof SceneProperties] = asset.path ?? "";
    }
  });
  return updatedSceneProperties;
};
