import { Asset } from "../../assets/types";

interface OverlayDisplayProps {
  overlays: Asset[];
}
export const OverlayDisplay = ({ overlays }: OverlayDisplayProps) => {
  return (
    <>
      {overlays.map((overlay) => (
        <img
          key={overlay.guid}
          src={overlay.path}
          alt={overlay.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
};
