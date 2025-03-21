import { Object3D } from "three";
import { AnimationProperties, AnimationType } from "../animation.types";
import { MeshObject } from "../../config/mesh/mesh.types";
export declare const performAnimation: (animationType: AnimationType, object: MeshObject | Object3D, progress: number, animationProperties: AnimationProperties, count?: number) => void;
