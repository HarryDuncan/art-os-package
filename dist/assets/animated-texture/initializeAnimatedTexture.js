import { VideoTexture } from "three";
export const initalizeAnimatedTexture = (videoElement) => {
    const texture = new VideoTexture(videoElement);
    return texture;
};
