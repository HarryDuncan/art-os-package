import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "../components/interactive-scene/InteractiveScene";
import { SceneConfig, SceneData } from "../config/config.types";
import { ReactNode } from "react";
import { Camera } from "three";
import { LogEntry } from "../utils/logger";

export interface SceneNodeProps {
  isSandboxMode?: boolean;
  sceneConfig: SceneConfig;
  externalSchemas?: Record<string, string>;
  /** When set, window state width uses this instead of `window.innerWidth`. */
  windowWidth?: number;
  /** When set, window state height uses this instead of `window.innerHeight`. */
  windowHeight?: number;
  loaderComponent?: ReactNode;
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void;
  onLog?: (entry: LogEntry) => void;
  onStatusChange?: (status: string) => void;
  onCleanup?: (data: unknown) => void;
  /** Keeps the WebGL drawing buffer so the canvas can be read back (e.g. `toDataURL`). */
  preserveDrawingBuffer?: boolean;
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
