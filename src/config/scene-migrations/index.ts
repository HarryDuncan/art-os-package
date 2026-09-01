import { SceneConfig } from "../config.types";
import { migrateV0ToV1Background } from "./migrations/v0-to-v1-background";
import { SceneConfigMigration } from "./types";

export type { SceneConfigMigration } from "./types";

export const CURRENT_SCENE_CONFIG_VERSION = 1;

export const SCENE_CONFIG_MIGRATIONS: SceneConfigMigration[] = [
  {
    fromVersion: 0,
    toVersion: 1,
    description:
      "Consolidate backgroundColor, backgroundUrl, and videoBackground into sceneProperties.background",
    migrate: migrateV0ToV1Background,
  },
];

export const migrateSceneConfig = (config: SceneConfig): SceneConfig => {
  let current = structuredClone(config) as SceneConfig;
  let version = current.configVersion ?? 0;

  while (version < CURRENT_SCENE_CONFIG_VERSION) {
    const migration = SCENE_CONFIG_MIGRATIONS.find(
      (entry) => entry.fromVersion === version,
    );

    if (!migration) {
      break;
    }

    current = migration.migrate(current);
    version = migration.toVersion;
  }

  return {
    ...current,
    configVersion: CURRENT_SCENE_CONFIG_VERSION,
  };
};
