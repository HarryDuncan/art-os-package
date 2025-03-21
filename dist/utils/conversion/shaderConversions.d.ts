import { PositionConfig } from "../three-dimension-space/position/position.types";
export declare const shaderSafeFloat: (value: number) => string;
export declare const shaderSafeVector: (position: PositionConfig) => string;
export declare const shaderSafeVector4: (position: PositionConfig, fourthElement?: number | string) => string;
