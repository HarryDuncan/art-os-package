import { SceneConfig } from "../config.types";
import { CURRENT_SCENE_CONFIG_VERSION } from "../../consts/defaults";
import { migrateV0ToV1Background } from "./migrations/v0-to-v1-background";
import { migrateV1ToV2ViewUnits } from "./migrations/v1-to-v2-view-units";
import { SceneConfigMigration } from "./types";

export type { SceneConfigMigration } from "./types";
export { migrateV0ToV1Background } from "./migrations/v0-to-v1-background";
export { migrateV1ToV2ViewUnits } from "./migrations/v1-to-v2-view-units";
export {
  CURRENT_SCENE_CONFIG_VERSION,
  SCENE_CONFIG_VERSIONS,
} from "../../consts/defaults";
export type { SceneConfigVersion } from "../../consts/defaults";

export const SCENE_CONFIG_MIGRATIONS: SceneConfigMigration[] = [
  {
    fromVersion: 0,
    toVersion: 1,
    description:
      "Consolidate backgroundColor, backgroundUrl, and videoBackground into sceneProperties.background",
    migrate: migrateV0ToV1Background,
  },
  {
    fromVersion: 1,
    toVersion: 2,
    description:
      "Convert sceneProperties.viewWidth/viewHeight viewport units (vw/vh) to percentages",
    migrate: migrateV1ToV2ViewUnits,
  },
];

/**
 * Runs all scene config migrations up to {@link CURRENT_SCENE_CONFIG_VERSION}.
 */
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

/**
 * Middleware entry-point for loading / validating scene configs.
 * Prefer this at app boundaries (editor, view scene, etc.).
 */
export const sceneConfigMiddleware = (
  config: SceneConfig,
): SceneConfig => migrateSceneConfig(config);
