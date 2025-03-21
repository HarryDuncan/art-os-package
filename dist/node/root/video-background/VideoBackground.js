"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoBackground = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const VideoBackground_styles_1 = require("./VideoBackground.styles");
const VideoBackground = ({ videoSrc, }) => {
    if (!videoSrc)
        return null;
    return ((0, jsx_runtime_1.jsx)(VideoBackground_styles_1.VideoBackgroundContainer, { children: (0, jsx_runtime_1.jsx)("video", Object.assign({ preload: "auto", autoPlay: true, muted: true, loop: true }, { children: (0, jsx_runtime_1.jsx)("source", { src: videoSrc, type: "video/mp4" }) })) }));
};
exports.VideoBackground = VideoBackground;
