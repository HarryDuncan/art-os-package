import { EventConfig } from "../interaction/interaction.types";
import {
  InteractiveSceneFunctions,
  SceneInteraction,
} from "../components/interactive-scene/InteractiveScene";
import { SceneData } from "../config/config.types";
import { AppendedNodesConfig } from "./appended-nodes/appendedNodes.types";

export interface SceneNodeProps {
  sceneConfig: SceneData;
  appendedNodes?: AppendedNodesConfig[];
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  loaderComponent?: React.ReactNode;
}

export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  sceneData: SceneData;
}
