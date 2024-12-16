import { VideoBackgroundContainer } from "./VideoBackground.styles";

export const VideoBackground = ({
  videoSrc,
}: {
  videoSrc: string | undefined;
}) => {
  if (!videoSrc) return null;
  return (
    <VideoBackgroundContainer>
      <video preload="auto" autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </VideoBackgroundContainer>
  );
};
