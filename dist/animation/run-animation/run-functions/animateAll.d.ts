import { MeshObject } from "../../../config/mesh/mesh.types";
import { Object3D } from "three";
import { AnimationProperties } from "../../animation.types";
export declare const animateAll: (animationProperties: AnimationProperties, animatedObjects: MeshObject[] | Object3D[]) => void;
