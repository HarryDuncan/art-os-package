export declare const LAYER_TYPES: {
    IMAGE: string;
    OVERLAY: string;
};
export type LayerType = keyof typeof LAYER_TYPES;
export type LayerProps = {
    src: string;
};
export type Layer = {
    layerName: string;
    layerType: LayerType;
    layerProps: LayerProps;
};
