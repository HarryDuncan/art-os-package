import { Asset } from "../../assets/types";
import { FormattedSceneProperties, SceneProperties } from "../config.types";
import { resolveSceneBackground } from "./resolveSceneBackground";

export const formatSceneProperties = (
  sceneProperties: SceneProperties,
  assets: Asset[],
): FormattedSceneProperties => {
  const background = resolveSceneBackground(sceneProperties.background, assets);

  const {
    backgroundColor: _backgroundColor,
    backgroundUrl: _backgroundUrl,
    videoBackground: _videoBackground,
    backgroundTexture,
    ...rest
  } = sceneProperties;

  return {
    ...rest,
    background,
    ...(backgroundTexture ? { backgroundTexture } : {}),
  };
};
