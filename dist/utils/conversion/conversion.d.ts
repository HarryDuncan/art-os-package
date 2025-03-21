import { PositionConfig } from "../three-dimension-space/position/position.types";
export declare const position3dToVector: (position: PositionConfig) => any;
export declare const vectorToPosition3d: (vector: Vector3) => {
    x: any;
    y: any;
    z: any;
};
export declare const vectorToArray: (vector: Vector3) => any[];
export declare const positionToArray: (position: PositionConfig) => number[];
export declare const positionConfigToPosition: (positionConfig: PositionConfig) => {
    x: number;
    y: number;
    z: number;
};
export declare const arrayToVector: (numberArray: number[]) => any;
