import { ColorSpace } from "three";
import { RENDERER_TYPES } from "./rendererConstants";
export type RendererType = keyof typeof RENDERER_TYPES;
export interface RendererParams {
    rendererType: RendererType;
    clearColor?: number;
    size?: {
        width: number;
        height: number;
    };
    outputColorSpace: ColorSpace;
}
