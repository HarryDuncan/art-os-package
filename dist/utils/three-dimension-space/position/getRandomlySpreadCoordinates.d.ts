import { BoundingBox, Position3d } from "./position.types";
export declare const generateRandomlySpreadCoordinates: (numCoordinates: number, allowedBoundingBoxes: BoundingBox[], exclusionBoundingBoxes: BoundingBox[], minDistance: number) => Position3d[];
