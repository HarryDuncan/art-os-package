import { APPENDED_NODE_TYPES } from "./appendedNodes.consts";
import { AppendedNodesConfig } from "./appendedNodes.types";
import { VideoStreamNode } from "./video-stream/VideoStreamNode";

interface AppendedNodesProps {
  appendedNodes: AppendedNodesConfig[];
}
export const AppendedNodes = ({ appendedNodes }: AppendedNodesProps) => {
  if (appendedNodes) {
    return (
      <>
        {appendedNodes.map((node) => {
          switch (node.nodeType) {
            case APPENDED_NODE_TYPES.VIDEO_STREAM:
              return <VideoStreamNode {...node.props} />;
            default:
              return null;
          }
        })}
      </>
    );
  }
  return null;
};
