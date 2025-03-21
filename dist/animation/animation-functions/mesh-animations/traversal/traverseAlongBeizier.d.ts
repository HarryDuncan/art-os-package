import { Vector3 } from "three";
interface BeizerTraversalProps {
    start: Vector3;
    end: Vector3;
    curveSize: number;
    t: number;
}
export declare const traversalFunction: (props: BeizerTraversalProps, object: Object3D) => void;
export declare const traverseAlongBezier: (start: Vector3, end: Vector3, curveSize: number, t: number) => Vector3;
export {};
