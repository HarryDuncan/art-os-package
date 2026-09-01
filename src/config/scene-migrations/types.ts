import { SceneConfig } from "../config.types";

export type SceneConfigMigration = {
  fromVersion: number;
  toVersion: number;
  description: string;
  migrate: (config: SceneConfig) => SceneConfig;
};
