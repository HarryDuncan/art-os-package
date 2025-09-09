import { SceneNodeProps } from "../node.types";
import { SceneProvider } from "../../context/context";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";
import { ErrorBoundary } from "../../components/error-boundary";
import { ProgressiveLoading } from "../components/ProgressiveLoading";

export const SceneNode = ({
  sceneConfig,
  loaderComponent,
  setExternalScene,
}: SceneNodeProps) => (
  <ErrorBoundary>
    <WindowStateProvider>
      <SceneProvider>
        <ProgressiveLoading
          sceneConfig={sceneConfig}
          loaderComponent={loaderComponent}
          setExternalScene={setExternalScene}
        />
      </SceneProvider>
    </WindowStateProvider>
  </ErrorBoundary>
);

export default SceneNode;
