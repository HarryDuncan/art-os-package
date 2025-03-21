import { ShaderMeshObject } from "../../../../config/mesh/mesh.types";
import { AnimationLoopConfigItem } from "./animationloop.types";
export declare const setUpAnimationLoop: (config: AnimationLoopConfigItem[], loopDuration: number) => (shaderMesh: Mesh<BufferGeometry, any>, time: number) => [shaderMesh: Mesh<BufferGeometry, any>, time: number];
