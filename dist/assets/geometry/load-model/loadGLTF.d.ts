import { AnimationClip } from "three";
export declare const loadGLTF: (path: string) => Promise<{
    scene: Group;
    animations: AnimationClip[];
}>;
