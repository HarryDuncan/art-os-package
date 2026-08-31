import { CONTROLLER_TYPE } from "./consts";

export type ControllerType =
  (typeof CONTROLLER_TYPE)[keyof typeof CONTROLLER_TYPE];

/** Bounds for a single slider axis (one float component). */
export type SliderDimensionConfig = {
  lowerBound: number;
  upperBound: number;
  /** Optional slider increment. When omitted, the UI picks a default. */
  step?: number;
};

/**
 * Slider UI for a uniform. Use one dimension for float,
 * two for vec2, three for vec3, four for vec4.
 */
export type SliderControllerConfig = {
  dimensions: SliderDimensionConfig[];
};

/** Position UI for a vec3 uniform (viewport gizmo). */
export type PositionControllerConfig = {
  /** When true, this position uniform can be picked and dragged in the viewport. */
  selectable: boolean;
};

export type ParameterControlConfig =
  | {
      controllerType: typeof CONTROLLER_TYPE.SLIDER;
      controllerConfig: SliderControllerConfig;
    }
  | {
      controllerType: typeof CONTROLLER_TYPE.COLOR;
      controllerConfig?: undefined;
    }
  | {
      controllerType: typeof CONTROLLER_TYPE.ASSET_CONTROLLER;
      controllerConfig?: undefined;
    }
  | {
      controllerType: typeof CONTROLLER_TYPE.POSITION;
      controllerConfig: PositionControllerConfig;
    };

/**
 * Scene-level map: material id → uniform id → control entry.
 * Empty object `{}` is valid.
 */
export type ParameterControlsConfig = Record<
  string,
  Record<string, ParameterControlConfig>
>;

/** Reference to a ParameterConfig.guid on the same material. */
export type ShaderEffectLightParameterRef = {
  parameterId: string;
};

export type ShaderEffectLightConfig = {
  /** Stable identity for UI keys / updates (independent of editable name). */
  id: string;
  name: string;
  /** Maps to a vec3 parameter. */
  position?: ShaderEffectLightParameterRef;
  /** Maps to a float parameter (0–1). */
  strength?: ShaderEffectLightParameterRef;
  /** Maps to a vec3 parameter. */
  color?: ShaderEffectLightParameterRef;
};

export type ShaderEffectControlConfig = {
  lights?: ShaderEffectLightConfig[];
};
