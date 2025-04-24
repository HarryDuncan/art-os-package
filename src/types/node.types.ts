import {
  EventConfig,
  InteractionConfig,
} from "../interaction/interaction.types";
import { InteractiveSceneFunctions } from "../components/interactive-scene/InteractiveScene";
import { SceneConfig, SceneData } from "./config.types";
import { AppendedNodesConfig } from "../node/appended-nodes/appendedNodes.types";
import { ReactNode } from "react";

export interface SceneNodeProps {
  sceneConfig: SceneConfig;
  appendedNodes?: AppendedNodesConfig[];
  events: EventConfig[];
  interactionConfig: InteractionConfig[];
  loaderComponent?: ReactNode;
}

export interface SceneNodeContentProps {
  sceneConfig: SceneConfig;
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionConfig: InteractionConfig[];
  loaderComponent?: ReactNode;
}
export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionConfig: InteractionConfig[];
  sceneData: SceneData;
}
