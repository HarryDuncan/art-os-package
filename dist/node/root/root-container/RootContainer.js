"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RootContainer_styles_1 = require("./RootContainer.styles");
const VideoBackground_1 = require("../video-background/VideoBackground");
const Layers_1 = require("../../../components/layers/Layers");
const RootContainer = ({ containerRef, sceneProperties, layers = [], }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Layers_1.Layers, { layers: layers }), (0, jsx_runtime_1.jsx)(RootContainer_styles_1.Root, Object.assign({ "$position": sceneProperties.position, "$height": sceneProperties.viewHeight, "$width": sceneProperties.viewWidth, "$fixed": sceneProperties.fixed, ref: containerRef, "$cursor": sceneProperties.cursor, "$backgroundColor": sceneProperties.backgroundColor, "$backgroundUrl": sceneProperties.backgroundUrl }, { children: (0, jsx_runtime_1.jsx)(VideoBackground_1.VideoBackground, { videoSrc: sceneProperties.videoBackground }) }))] }));
};
exports.RootContainer = RootContainer;
