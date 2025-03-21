declare const QUADRANT: {
    ONE: string;
    TWO: string;
    THREE: string;
    FOUR: string;
};
export type Quadrant = keyof typeof QUADRANT;
export declare function getQuadrant(degree: number): Quadrant;
export declare const getCalculationWeightingForQuadrant: (rotationRadians: number) => any;
export {};
