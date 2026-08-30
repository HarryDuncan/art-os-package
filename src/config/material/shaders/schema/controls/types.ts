import { CONTROLLER_TYPE } from "./consts";

export type ControllerType =
  (typeof CONTROLLER_TYPE)[keyof typeof CONTROLLER_TYPE];

/** Bounds for a single slider axis (one float component). */
export type SliderDimensionConfig = {
  lowerBound: number;
  upperBound: number;
};

/**
 * Slider UI for a uniform. Use one dimension for float,
 * two for vec2, three for vec3, four for vec4.
 */
export type SliderControllerConfig = {
  dimensions: SliderDimensionConfig[];
};

/** Light UI for a vec3 uniform (shader light position). */
export type LightControllerConfig = {
  /** When true, this light uniform can be picked and dragged in the viewport. */
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
      controllerType: typeof CONTROLLER_TYPE.LIGHT;
      controllerConfig: LightControllerConfig;
    };

/**
 * Scene-level map: material id → uniform id → control entry.
 * Empty object `{}` is valid.
 */
export type ParameterControlsConfig = Record<
  string,
  Record<string, ParameterControlConfig>
>;
