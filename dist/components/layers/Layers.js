import { jsx as _jsx } from "react/jsx-runtime";
import { LayerImg, LayerOverlay, LayersContainer } from "./Layers.styles";
import { LAYER_TYPES } from "./types";
const LAYERS = "../assets/layers/";
export const Layers = ({ layers }) => {
    if (!layers.length) {
        return null;
    }
    return (_jsx(LayersContainer, { children: layers.map((layer) => {
            switch (layer.layerType) {
                case LAYER_TYPES.IMAGE:
                    return (_jsx(LayerImg, { src: `${LAYERS}${layer.layerProps.src}` }, layer.layerName));
                case LAYER_TYPES.OVERLAY:
                default:
                    return _jsx(LayerOverlay, {}, layer.layerName);
            }
        }) }));
};
