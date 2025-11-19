import { InputMap, OutputMap } from "../types";
import { EVENT_BIND_TYPES } from "./consts";
import { KEYS } from "./peripheral-interactions/peripheralInteractions.consts";

export type InteractionEventBinding = keyof typeof EVENT_BIND_TYPES;

export type PeripheralSourceConfig = {
  eventKey: string;
  keypointId: string;
};
export type PoseEstimationConfig = {
  keypointId: string;
  mappingTo: Record<string, OutputMap>;
};

export type SourceConfig = PeripheralSourceConfig;
export type InteractionConfig = {
  guid: string;
  name?: string;
  bindingType?: InteractionEventBinding;
  interactionSource: string;
  sourceConfig: SourceConfig;
  materialIds?: string[];
  functionType?: string;
  inputMapping: Record<string, InputMap>;
  outputMapping: Record<string, OutputMap>;
};

export type ExternalInteractionConfig = InteractionConfig & {
  algorithmType: string;
  algorithmConfig: {
    threshold: number;
    keyPoints: string[];
  };
  dataTransformType: string;
  id: string;
};

export type InteractionEvent = Event & {
  detail: unknown;
};

export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;

export type KEY = keyof typeof KEYS;
