import { Scene } from "three";
import {
  EVENT_BINDING_TYPE,
  EVENT_BIND_TYPES,
  KEYS,
} from "./interaction.consts";

export type InteractionEventBinding = keyof typeof EVENT_BINDING_TYPE;

export type InteractionConfig = {
  id: string;
  name?: string;
  interactionType: string;
  bindingType?: InteractionEventBinding;
  eventKey: string;
  materialIds?: string[];
  functionType?: string;
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

export interface EventConfig {
  eventKey: string;
  eventFunction: (scene: Scene, event: Event) => void;
  sceneIdentifier?: string;
}

export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;

export type KEY = keyof typeof KEYS;
