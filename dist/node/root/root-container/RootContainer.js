import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Root } from "./RootContainer.styles";
import { VideoBackground } from "../video-background/VideoBackground";
import { Layers } from "../../../components/layers/Layers";
export const RootContainer = ({ containerRef, sceneProperties, layers = [], }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Layers, { layers: layers }), _jsx(Root, Object.assign({ "$position": sceneProperties.position, "$height": sceneProperties.viewHeight, "$width": sceneProperties.viewWidth, "$fixed": sceneProperties.fixed, ref: containerRef, "$cursor": sceneProperties.cursor, "$backgroundColor": sceneProperties.backgroundColor, "$backgroundUrl": sceneProperties.backgroundUrl }, { children: _jsx(VideoBackground, { videoSrc: sceneProperties.videoBackground }) }))] }));
};
