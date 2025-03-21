import { AnimationLoopType, LoopProps } from "../animationloop.types";
export declare const getLoopType: (loopType: AnimationLoopType, duration: number, loopProps: Partial<LoopProps>) => (time: number) => number;
