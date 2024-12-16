import { VideoTexture } from "three";

export const initalizeAnimatedTexture = (videoElement: HTMLVideoElement) => {
  const texture = new VideoTexture(videoElement);
  return texture;
};
