import { InputMap, OutputMap } from "../types";
import { EVENT_BIND_TYPES } from "./consts";
import { KEYS } from "./peripheral-interactions/peripheralInteractions.consts";

export type BaseAlgorithmConfig = {
  selectedKeypointIds: string[];
};
export type ModelConfig = {
  modelId: string;
  algorithmType: string;
  algorithmConfig: BaseAlgorithmConfig;
};

export type InteractionOutputSchema = {
  id: string;
  outputType: string;
  keypointIds: string[];
  title: string;
  parameterKeys?: string[];
};

export type InteractionOutput = {
  functionType: string;
  bindingType: InteractionEventBinding;
  outputSchema: InteractionOutputSchema[];
};
export type InteractionSchema = {
  guid: string;
  name?: string;
  description?: string;
  modelConfig: ModelConfig;
  input?: unknown;
  output: InteractionOutput;
};
export type InteractionEventBinding = keyof typeof EVENT_BIND_TYPES;

export type PeripheralSourceConfig = {
  eventKey: string;
  keypointId: string;
};

export type InteractionConfig = InteractionSchema & {
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
