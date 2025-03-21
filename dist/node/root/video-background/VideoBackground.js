import { jsx as _jsx } from "react/jsx-runtime";
import { VideoBackgroundContainer } from "./VideoBackground.styles";
export const VideoBackground = ({ videoSrc, }) => {
    if (!videoSrc)
        return null;
    return (_jsx(VideoBackgroundContainer, { children: _jsx("video", Object.assign({ preload: "auto", autoPlay: true, muted: true, loop: true }, { children: _jsx("source", { src: videoSrc, type: "video/mp4" }) })) }));
};
