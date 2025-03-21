import { Position3d } from "../../utils/three-dimension-space/position/position.types";
type AxisOptions = {
    x?: boolean;
    y?: boolean;
    z?: boolean;
};
export declare const getRandomRotation: (n: number, nonRandomizedAxes?: Partial<AxisOptions>) => Position3d[];
export declare const getRandomRotationAsDegrees: (nonRandomizedAxes?: Partial<AxisOptions>) => {
    x: number;
    y: number;
    z: number;
};
export {};
