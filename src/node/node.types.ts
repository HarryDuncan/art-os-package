import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "../components/interactive-scene/InteractiveScene";
import { SceneConfig, SceneData } from "../config/config.types";
import { ReactNode } from "react";
import { Camera } from "three";
import { LogEntry } from "../utils/logger";

export interface SceneNodeProps {
  sceneConfig: SceneConfig;
  externalSchemas?: Record<string, string>;
  loaderComponent?: ReactNode;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
  onLog?: (entry: LogEntry) => void;
}

export interface SceneNodeContentProps {
  sceneConfig: SceneConfig;
  sceneFunctions?: InteractiveSceneFunctions;
  loaderComponent?: ReactNode;
}
export interface NodeProps {
  sceneFunctions?: InteractiveSceneFunctions;
  sceneData: SceneData;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
}
