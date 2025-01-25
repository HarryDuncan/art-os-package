import { EventConfig } from "../interaction/interactions.types";
import {
  InteractiveSceneFunctions,
  SceneInteraction,
} from "../components/interactive-scene/InteractiveScene";
import { SceneData } from "../config/config.types";
import { AppendedNodesConfig } from "./appended-nodes/appendedNodes.types";

export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  sceneData: SceneData;
  appendedNodes?: AppendedNodesConfig[];
}
