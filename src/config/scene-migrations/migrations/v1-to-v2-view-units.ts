import { SceneConfig } from "../../config.types";

const VIEWPORT_UNIT_PATTERN = /^([\d.]+)(vw|vh)$/i;

const convertViewportUnitToPercent = (
  value: string,
  viewportUnit: "vw" | "vh",
): string => {
  const trimmed = value.trim();
  const match = trimmed.match(VIEWPORT_UNIT_PATTERN);
  if (!match) {
    return value;
  }

  const unit = match[2].toLowerCase();
  if (unit !== viewportUnit) {
    return value;
  }

  return `${match[1]}%`;
};

export const migrateV1ToV2ViewUnits = (config: SceneConfig): SceneConfig => {
  const sceneProperties = config.sceneProperties;

  return {
    ...config,
    configVersion: 2,
    sceneProperties: {
      ...sceneProperties,
      viewWidth: convertViewportUnitToPercent(
        sceneProperties.viewWidth ?? "100%",
        "vw",
      ),
      viewHeight: convertViewportUnitToPercent(
        sceneProperties.viewHeight ?? "100%",
        "vh",
      ),
    },
  };
};
