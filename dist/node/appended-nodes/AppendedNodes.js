"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendedNodes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const appendedNodes_consts_1 = require("./appendedNodes.consts");
const VideoStreamNode_1 = require("./video-stream/VideoStreamNode");
const AppendedNodes = ({ appendedNodes }) => {
    if (appendedNodes) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: appendedNodes.map((node) => {
                switch (node.nodeType) {
                    case appendedNodes_consts_1.APPENDED_NODE_TYPES.VIDEO_STREAM:
                        return (0, jsx_runtime_1.jsx)(VideoStreamNode_1.VideoStreamNode, Object.assign({}, node.props));
                    default:
                        return null;
                }
            }) }));
    }
    return null;
};
exports.AppendedNodes = AppendedNodes;
