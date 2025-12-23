import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { PROCESS_STATUS } from "../consts/consts";
import { Camera, WebGLRenderer } from "three";
import { InteractionConfig } from "../interaction/types";
import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";
import { Asset } from "../assets/types";
import { disposeAssets } from "../utils/cleanup/disposeAssets";
import { SceneData } from "../config/config.types";

type SceneContextType = {
  initializedScene: React.MutableRefObject<InteractiveScene | null>;
  camera: React.MutableRefObject<Camera | null>;
  sceneStatus: string;
  setStatus: (sceneStatus: string) => void;
  renderer: WebGLRenderer | null;
  setRenderer: (renderer: WebGLRenderer) => void;
  currentFrameRef: React.MutableRefObject<number>;
  rendererHeight: number;
  setRendererHeight: (rendererHeight: number) => void;
  rendererWidth: number;
  setRendererWidth: (rendererWidth: number) => void;
  interactionConfigs: InteractionConfig[];
  setInteractionConfigs: (interactionConfigs: InteractionConfig[]) => void;
  areAssetsInitialized: boolean;
  assetsRef: React.MutableRefObject<Asset[] | null>;
  setInitializedAssets: (initializedAssets: Asset[] | null) => void;
  setAreAssetsInitialized: (areAssetsInitialized: boolean) => void;
  manualCleanup: () => void; // Exposed if you need to trigger it manually
  sceneDataRef: React.MutableRefObject<SceneData | null>;
  setSceneData: (sceneData: SceneData | null) => void;
};

export const SceneContext = createContext<SceneContextType | undefined>(
  undefined
);

interface SceneProviderProps {
  children: ReactNode;
  onStatusChange?: (status: string) => void;
}

const SceneProvider: FC<SceneProviderProps> = ({
  children,
  onStatusChange,
}) => {
  // --- REFS (The Source of Truth for Cleanup) ---
  const initializedScene = useRef<InteractiveScene | null>(null);
  const camera = useRef<Camera | null>(null);
  const currentFrameRef = useRef<number>(0);

  // We use refs to track these for cleanup, because State is stale inside useEffect return
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const assetsRef = useRef<Asset[] | null>(null);

  // --- STATE (For UI Reactivity) ---
  const [sceneStatus, setStatus] = useState<string>(
    PROCESS_STATUS.FORMATTING_THREE
  );
  const [interactionConfigs, setInteractionConfigs] = useState<
    InteractionConfig[]
  >([]);
  const [rendererHeight, setRendererHeight] = useState<number>(0);
  const [rendererWidth, setRendererWidth] = useState<number>(0);
  const [areAssetsInitialized, setAreAssetsInitialized] = useState(false);

  const [renderer, setRendererState] = useState<WebGLRenderer | null>(null);

  const sceneDataRef = useRef<SceneData | null>(null);
  const setSceneData = (sceneData: SceneData | null) => {
    sceneDataRef.current = sceneData;
  };
  // --- SYNC STATE TO REFS ---
  // Wrappers to keep state and refs in sync
  const setRenderer = (newRenderer: WebGLRenderer) => {
    rendererRef.current = newRenderer; // Update Ref for cleanup
    setRendererState(newRenderer); // Update State for UI
  };

  const setInitializedAssets = (assets: Asset[] | null) => {
    assetsRef.current = assets; // Update Ref for cleanup
  };

  // Notify parent of status changes
  useEffect(() => {
    if (onStatusChange) onStatusChange(sceneStatus);
  }, [sceneStatus, onStatusChange]);

  // --- THE CLEANUP LOGIC ---
  const performCleanup = useCallback(() => {
    console.log("♻️ Starting Cleanup...");

    // 1. Stop the loop
    if (currentFrameRef.current) {
      cancelAnimationFrame(currentFrameRef.current);
      currentFrameRef.current = 0;
    }

    // 2. Dispose Scene (Scene has its own dispose method usually)
    if (initializedScene.current) {
      // Assuming your InteractiveScene class has these methods
      if (
        typeof initializedScene.current.removeExecutionFunctions === "function"
      ) {
        initializedScene.current.removeExecutionFunctions();
      }
      if (typeof initializedScene.current.dispose === "function") {
        initializedScene.current.dispose();
      }
      initializedScene.current = null;
    }

    // 3. Dispose Assets (Using the ref, so it's never stale)
    if (assetsRef.current) {
      disposeAssets(assetsRef.current);
      assetsRef.current = null;
    }

    // 4. Dispose Renderer (Using the ref)
    if (rendererRef.current) {
      rendererRef.current.dispose();

      // Strict cleanup: lose context to force GPU memory release
      const gl = rendererRef.current.getContext();
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();

      rendererRef.current.domElement.remove();
      rendererRef.current = null;
      setRendererState(null);
    }

    setSceneData(null);
    sceneDataRef.current = null;

    console.log("✅ Cleanup Complete");
  }, []);

  // --- MOUNT / UNMOUNT EFFECT ---
  useEffect(() => {
    // Mount logic here if needed

    return () => {
      // UNMOUNT: This runs only when the component is removed from the DOM
      setStatus(PROCESS_STATUS.CLEANING_UP);
      performCleanup();
    };
  }, [performCleanup]); // Dependency array should only contain stable functions

  return (
    <SceneContext.Provider
      value={{
        initializedScene,
        sceneStatus,
        setStatus,
        camera,
        renderer,
        setRenderer,
        currentFrameRef,
        rendererHeight,
        setRendererHeight,
        rendererWidth,
        setRendererWidth,
        interactionConfigs,
        setInteractionConfigs,
        areAssetsInitialized,
        assetsRef,
        setInitializedAssets,
        setAreAssetsInitialized,
        manualCleanup: performCleanup,
        sceneDataRef,
        setSceneData,
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
