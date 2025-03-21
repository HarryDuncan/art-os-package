import { Camera } from "three";
import { POST_PROCESSOR_PASSES } from "./postProcessor.consts";
export type PostProcessorCamera = Camera & {
    aspect: number;
};
export type PostProcessorPasses = keyof typeof POST_PROCESSOR_PASSES;
export type Effects = {
    effectType: PostProcessorPasses;
    params: effectParam;
};
export type effectParam = BrightnessPassParams;
export type BrightnessPassParams = {
    strength: number;
    radius: number;
    threshold: number;
};
