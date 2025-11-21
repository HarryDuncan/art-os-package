import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useRef,
} from "react";
import { PROCESS_STATUS } from "../consts/consts";
import { Camera } from "three";
import { InteractionConfig } from "../interaction/types";
import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";

type SceneContextType = {
  initializedScene: React.MutableRefObject<InteractiveScene | null>;
  camera: React.MutableRefObject<Camera | null>;
  sceneStatus: string;
  setStatus: (sceneStatus: string) => void;

  rendererHeight: number;
  setRendererHeight: (rendererHeight: number) => void;
  rendererWidth: number;
  setRendererWidth: (rendererWidth: number) => void;
  interactionConfigs: InteractionConfig[];
  setInteractionConfigs: (interactionConfigs: InteractionConfig[]) => void;
};
export const SceneContext = createContext<SceneContextType | undefined>(
  undefined
);

interface SceneProviderProps {
  children: ReactNode;
}

const SceneProvider: FC<SceneProviderProps> = ({ children }) => {
  const initializedScene = useRef<InteractiveScene | null>(null);
  const camera = useRef<Camera | null>(null);

  const [sceneStatus, setStatus] = useState<string>(
    PROCESS_STATUS.FORMATTING_THREE
  );

  const [interactionConfigs, setInteractionConfigs] = useState<
    InteractionConfig[]
  >([]);
  const [rendererHeight, setRendererHeight] = useState<number>(0);
  const [rendererWidth, setRendererWidth] = useState<number>(0);

  return (
    <SceneContext.Provider
      value={{
        initializedScene,

        sceneStatus,
        setStatus,
        camera,

        rendererHeight,
        setRendererHeight,
        rendererWidth,
        setRendererWidth,
        interactionConfigs,
        setInteractionConfigs,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useSceneContext must be used within a Scene Provider");
  }

  return context;
};

export { SceneProvider, useSceneContext };
