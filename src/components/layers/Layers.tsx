import React from "react";
import { LayerImg, LayerOverlay, LayersContainer } from "./Layers.styles";
import { LAYER_TYPES, Layer } from "./types";

const LAYERS = "../assets/layers/";

export const Layers = ({ layers }: { layers: Layer[] }) => {
  if (!layers.length) {
    return null;
  }
  return (
    <LayersContainer>
      {layers.map((layer) => {
        switch (layer.layerType) {
          case LAYER_TYPES.IMAGE:
            return (
              <LayerImg
                src={`${LAYERS}${layer.layerProps.src}`}
                key={layer.layerName}
              />
            );
          case LAYER_TYPES.OVERLAY:
          default:
            return <LayerOverlay key={layer.layerName} />;
        }
      })}
    </LayersContainer>
  );
};
