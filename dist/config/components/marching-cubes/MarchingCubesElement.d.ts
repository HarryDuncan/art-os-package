import { Object3D } from "three";
import { MarchingCubesProps } from "../threeJsComponents.types";
export declare const createMarchingCubes: (resolution: number, isolation: number) => Promise<Object3D>;
export declare const MarchingCubesElement: ({ id, resolution, material, isolation, scale, }: MarchingCubesProps & {
    id: string;
}) => Promise<any>;
