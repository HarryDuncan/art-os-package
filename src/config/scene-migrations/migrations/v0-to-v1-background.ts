import {
  SceneBackground,
  SceneConfig,
  SceneProperties,
} from "../../config.types";

const buildColorBackground = (
  sceneProperties: SceneProperties,
): SceneBackground => {
  const existing = sceneProperties.background;
  if (existing?.type === "color" && existing.color) {
    return existing;
  }

  return {
    type: "color",
    color: sceneProperties.backgroundColor || "white",
  };
};

const stripLegacyBackgroundFields = (
  sceneProperties: SceneProperties,
): Omit<
  SceneProperties,
  "backgroundColor" | "backgroundUrl" | "videoBackground"
> => {
  const {
    backgroundColor: _backgroundColor,
    backgroundUrl: _backgroundUrl,
    videoBackground: _videoBackground,
    ...rest
  } = sceneProperties;
  return rest;
};

export const migrateV0ToV1Background = (config: SceneConfig): SceneConfig => {
  const sceneProperties = config.sceneProperties;
  const background = buildColorBackground(sceneProperties);
  const rest = stripLegacyBackgroundFields(sceneProperties);

  return {
    ...config,
    configVersion: 1,
    sceneProperties: {
      ...rest,
      background,
    } as SceneProperties,
  };
};
