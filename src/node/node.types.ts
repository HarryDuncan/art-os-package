import { EventConfig } from "interaction/interactions.types";
import { AnimationConfig } from "display/animation/animation.types";
import {
  InteractiveSceneFunctions,
  SceneInteraction,
} from "display/components/interactive-scene/InteractiveScene";
import { SceneData } from "config/config.types";

export interface NodeProps {
  sceneFunctions: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  animations?: AnimationConfig[];
  sceneData: SceneData;
}
