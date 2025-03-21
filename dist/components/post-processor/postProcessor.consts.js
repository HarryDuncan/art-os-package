import { LinearFilter, RGBAFormat } from "three";
export const POST_PROCESSOR_PASSES = {
    BRIGHTNESS: "brightness",
};
export const defaultRenderTargetParameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    stencilBuffer: true,
};
