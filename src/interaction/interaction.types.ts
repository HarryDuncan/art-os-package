import { EVENT_BIND_TYPES } from "./interaction.consts";
import { KEYS } from "./peripheral-interactions/peripheralInteractions.consts";

export type InteractionEventBinding = keyof typeof EVENT_BIND_TYPES;
export type InteractionConnectionMapping = {
  parameterId: string;
  parameterKey: string;
  targetId?: string;
};
export type PeripheralSourceConfig = {
  eventKey: string;
  keypointId: string;
};
export type PoseEstimationConfig = {
  keypointId: string;
  mappingTo: Record<string, InteractionConnectionMapping>;
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
  inputMapping: Record<string, InteractionConnectionMapping>;
  outputMapping: Record<string, InteractionConnectionMapping>;
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
