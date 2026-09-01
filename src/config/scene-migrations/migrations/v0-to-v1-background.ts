import {
  SceneBackground,
  SceneConfig,
  SceneProperties,
} from "../../config.types";

const buildBackgroundFromLegacy = (
  sceneProperties: SceneProperties,
): SceneBackground => {
  const videoGuid = sceneProperties.videoBackground?.trim();
  if (videoGuid) {
    return { type: "asset", assetGuid: videoGuid };
  }

  const imageGuid = sceneProperties.backgroundUrl?.trim();
  if (imageGuid) {
    return { type: "asset", assetGuid: imageGuid };
  }

  return {
    type: "color",
    color: sceneProperties.backgroundColor || "white",
  };
};

export const migrateV0ToV1Background = (config: SceneConfig): SceneConfig => {
  const sceneProperties = config.sceneProperties;

  if (sceneProperties.background?.type) {
    const {
      backgroundColor: _backgroundColor,
      backgroundUrl: _backgroundUrl,
      videoBackground: _videoBackground,
      ...rest
    } = sceneProperties;

    return {
      ...config,
      configVersion: 1,
      sceneProperties: rest as SceneProperties,
    };
  }

  const background = buildBackgroundFromLegacy(sceneProperties);
  const {
    backgroundColor: _backgroundColor,
    backgroundUrl: _backgroundUrl,
    videoBackground: _videoBackground,
    ...rest
  } = sceneProperties;

  return {
    ...config,
    configVersion: 1,
    sceneProperties: {
      ...rest,
      background,
    } as SceneProperties,
  };
};
