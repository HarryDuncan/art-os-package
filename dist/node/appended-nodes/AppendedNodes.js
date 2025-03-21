import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { APPENDED_NODE_TYPES } from "./appendedNodes.consts";
import { VideoStreamNode } from "./video-stream/VideoStreamNode";
export const AppendedNodes = ({ appendedNodes }) => {
    if (appendedNodes) {
        return (_jsx(_Fragment, { children: appendedNodes.map((node) => {
                switch (node.nodeType) {
                    case APPENDED_NODE_TYPES.VIDEO_STREAM:
                        return _jsx(VideoStreamNode, Object.assign({}, node.props));
                    default:
                        return null;
                }
            }) }));
    }
    return null;
};
