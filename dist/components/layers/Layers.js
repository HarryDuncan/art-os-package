"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layers = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Layers_styles_1 = require("./Layers.styles");
const types_1 = require("./types");
const LAYERS = "../assets/layers/";
const Layers = ({ layers }) => {
    if (!layers.length) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(Layers_styles_1.LayersContainer, { children: layers.map((layer) => {
            switch (layer.layerType) {
                case types_1.LAYER_TYPES.IMAGE:
                    return ((0, jsx_runtime_1.jsx)(Layers_styles_1.LayerImg, { src: `${LAYERS}${layer.layerProps.src}` }, layer.layerName));
                case types_1.LAYER_TYPES.OVERLAY:
                default:
                    return (0, jsx_runtime_1.jsx)(Layers_styles_1.LayerOverlay, {}, layer.layerName);
            }
        }) }));
};
exports.Layers = Layers;
