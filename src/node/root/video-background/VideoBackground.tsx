export const VideoBackground = ({
  videoSrc,
}: {
  videoSrc: string | undefined;
}) => {
  if (!videoSrc) return null;
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <video
        style={{
          objectFit: "fill",
          overflow: "visible",
          height: "100%",
          width: "100%",
        }}
        preload="auto"
        autoPlay
        muted
        loop
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};
