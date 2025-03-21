import { BlendingConfig } from "./blendingOptions.types";
export declare const configureBlendingOptions: (blendingConfig: Partial<BlendingConfig> | undefined) => {
    blendSrc?: undefined;
    blendDst?: undefined;
    transparent?: undefined;
    depthTest?: undefined;
} | {
    blendSrc: any;
    blendDst: any;
    transparent: boolean;
    depthTest: boolean;
};
