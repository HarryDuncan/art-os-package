import { SceneNodeProps } from "../node.types";
import { SceneProvider } from "../../context/context";
import { WindowStateProvider } from "../../compat/window-state/windowStateProvider";
// import { ExternalInteractionNode } from "../external-interaction-nodes/ExternalInteractionNode";
import { ErrorBoundary } from "../../components/error-boundary";
import { ProgressiveLoading } from "../components/ProgressiveLoading";

export const SceneNode = ({
  sceneConfig,
  //  externalInteractionConfig,
  loaderComponent,
}: SceneNodeProps) => (
  <ErrorBoundary>
    <WindowStateProvider>
      <SceneProvider>
        <ProgressiveLoading
          sceneConfig={sceneConfig}
          loaderComponent={loaderComponent}
        />
        {/* {externalInteractionConfig && (
          <ExternalInteractionNode
            externalInteractionConfig={externalInteractionConfig}
          />
        )} */}
      </SceneProvider>
    </WindowStateProvider>
  </ErrorBoundary>
);

export default SceneNode;
