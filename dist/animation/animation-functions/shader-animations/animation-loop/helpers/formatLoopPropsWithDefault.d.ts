import { AnimationLoopProps } from "../animationloop.types";
export declare const formatLoopPropsWithDefault: (defaultLoopProps: AnimationLoopProps, parsedLoopProps: Partial<AnimationLoopProps>) => {
    peak: number;
    trough: number;
    duration: number;
    speed: number;
    flickerTimeAtMax: number;
    flickerType: string;
    steepness: number;
    loopLimit: number;
    maxPeak: number;
    minTrough: number;
} | {
    peak: number;
    trough: number;
    duration: number;
    speed: number;
    overlapPercentage?: number;
    flickerTimeAtMax: number;
    flickerType: string;
    steepness: number;
    loopLimit: number;
    maxPeak: number;
    minTrough: number;
} | {
    peak: number;
    trough: number;
    duration: number;
    speed: number;
    flickerTimeAtMax?: number;
    flickerType?: string;
    overlapPercentage: number;
    steepness: number;
    loopLimit: number;
    maxPeak: number;
    minTrough: number;
} | {
    peak: number;
    trough: number;
    duration: number;
    speed: number;
    overlapPercentage: number;
    steepness: number;
    loopLimit: number;
    maxPeak: number;
    minTrough: number;
};
