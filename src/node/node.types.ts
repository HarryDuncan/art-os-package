import { InteractionConfig } from "../interaction/interaction.types";
import { InteractiveSceneFunctions } from "../components/interactive-scene/InteractiveScene";
import { SceneConfig, SceneData } from "../config/config.types";
import { ReactNode } from "react";

export interface SceneNodeProps {
  sceneConfig: SceneConfig;
  externalInteractionConfig: InteractionConfig[];
  loaderComponent?: ReactNode;
}

export interface SceneNodeContentProps {
  sceneConfig: SceneConfig;
  sceneFunctions?: InteractiveSceneFunctions;
  loaderComponent?: ReactNode;
}
export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  interactionConfig: InteractionConfig[];
  sceneData: SceneData;
}
