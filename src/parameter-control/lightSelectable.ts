import { CONTROLLER_TYPE } from "../config/material/shaders/schema/controls/consts";
import {
  LightControllerConfig,
  ParameterControlConfig,
} from "../config/material/shaders/schema/controls/types";

const selectableOverrides = new Map<string, boolean>();
let onSelectableChange: (() => void) | null = null;

const overrideKey = (materialId: string, uniformKey: string) =>
  `${materialId}::${uniformKey}`;

/** Used by lightUniformInteraction to refresh handles when selectable changes. */
export const setLightSelectableChangeListener = (
  listener: (() => void) | null,
): void => {
  onSelectableChange = listener;
};

export const clearLightUniformSelectableOverrides = (): void => {
  selectableOverrides.clear();
  onSelectableChange?.();
};

export const setLightUniformSelectable = (
  materialId: string,
  uniformKey: string,
  selectable: boolean,
): void => {
  selectableOverrides.set(overrideKey(materialId, uniformKey), selectable);
  onSelectableChange?.();
};

export const getLightUniformSelectableOverride = (
  materialId: string,
  uniformKey: string,
): boolean | undefined =>
  selectableOverrides.get(overrideKey(materialId, uniformKey));

/** Effective selectable: runtime override, else config value, else false. */
export const isLightUniformSelectable = (
  materialId: string,
  uniformKey: string,
  controlsConfig?: ParameterControlConfig | null,
): boolean => {
  const override = getLightUniformSelectableOverride(materialId, uniformKey);
  if (override !== undefined) return override;
  if (
    controlsConfig?.controllerType === CONTROLLER_TYPE.LIGHT &&
    controlsConfig.controllerConfig
  ) {
    return (controlsConfig.controllerConfig as LightControllerConfig)
      .selectable;
  }
  return false;
};

/** Merge runtime selectable into a LIGHT controlsConfig for snapshots. */
export const withEffectiveLightSelectable = (
  materialId: string,
  uniformKey: string,
  controlsConfig: ParameterControlConfig | null,
): ParameterControlConfig | null => {
  if (
    !controlsConfig ||
    controlsConfig.controllerType !== CONTROLLER_TYPE.LIGHT
  ) {
    return controlsConfig;
  }
  return {
    controllerType: CONTROLLER_TYPE.LIGHT,
    controllerConfig: {
      selectable: isLightUniformSelectable(
        materialId,
        uniformKey,
        controlsConfig,
      ),
    },
  };
};
