import { SceneNodeProps } from "../node.types";
import { SceneProvider } from "../../context/context";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";
import { ErrorBoundary } from "../../components/error-boundary";
import { ProgressiveLoading } from "../components/ProgressiveLoading";
import { useLoggerHandler } from "../../utils/useLoggerHandler";

export const SceneNode = ({
  sceneConfig,
  windowWidth,
  windowHeight,
  loaderComponent,
  setExternalScene,
  onLog,
  onStatusChange,
}: SceneNodeProps) => {
  useLoggerHandler(onLog);
  return (
    <ErrorBoundary>
      <WindowStateProvider
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      >
        <SceneProvider onStatusChange={onStatusChange}>
          <ProgressiveLoading
            sceneConfig={sceneConfig}
            loaderComponent={loaderComponent}
            setExternalScene={setExternalScene}
          />
        </SceneProvider>
      </WindowStateProvider>
    </ErrorBoundary>
  );
};

export default SceneNode;
