import { BoundingBox, Position3d } from "./position/position.types";
export declare const createBoundingBox: ({ center, width, height, depth, }: {
    center: Partial<Position3d>;
    width: number;
    height: number;
    depth: number;
}) => BoundingBox;
