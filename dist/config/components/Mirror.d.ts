import { Mesh } from "three";
import { MirrorProps } from "./threeJsComponents.types";
export declare const Mirror: ({ id, geometry, position, }: MirrorProps & {
    id: string;
}) => Promise<any>;
export declare const createMirror: (width: number, height: number) => Promise<Mesh>;
