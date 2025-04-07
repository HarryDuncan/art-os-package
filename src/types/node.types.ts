import { EventConfig } from "../interaction/interaction.types";
import {
  InteractiveSceneFunctions,
  SceneInteraction,
} from "../components/interactive-scene/InteractiveScene";
import { SceneConfig, SceneData } from "./config.types";
import { AppendedNodesConfig } from "../node/appended-nodes/appendedNodes.types";
import { ReactNode } from "react";

export interface SceneNodeProps {
  sceneConfig: SceneConfig;
  appendedNodes?: AppendedNodesConfig[];
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  loaderComponent?: ReactNode;
}

export interface SceneNodeContentProps {
  sceneConfig: SceneConfig;
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  loaderComponent?: ReactNode;
}
export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  sceneData: SceneData;
}
