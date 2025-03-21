import { BufferGeometry, ColorRepresentation, Material, Vector2, Vector3 } from "three";
export interface ThreeJSComponentProps {
    position: Vector3;
}
export interface MarchingCubesProps extends ThreeJSComponentProps {
    resolution?: number;
    material?: Material;
    isolation?: number;
    scale?: number;
}
export interface TextProps extends ThreeJSComponentProps {
    text: string;
    fontUrl: string;
    material?: Material;
}
export interface MirrorProps extends ThreeJSComponentProps {
    geometry: BufferGeometry;
    color?: ColorRepresentation;
}
export interface SphericalBackgroundProps extends ThreeJSComponentProps {
    rotation?: Vector3;
    radius: number;
    material?: Material;
}
export interface ShaderBackgroundProps {
    material: Material;
    size?: Vector2;
    position?: Vector3;
}
export interface PlaneProps extends ThreeJSComponentProps {
    size?: Vector2;
    material?: Material;
}
export interface CubeProps extends ThreeJSComponentProps {
    size?: Vector3;
    material?: Material;
}
export type ComponentProps = TextProps | MarchingCubesProps | MirrorProps | SphericalBackgroundProps | CubeProps;
export declare const SCENE_ELEMENTS: {
    MARCHING_CUBES: string;
    TEXT: string;
    MIRROR: string;
    SPHERICAL_BACKGROUND: string;
    PLANE: string;
    CUBE: string;
    SHADER_BACKGROUND: string;
};
export type SceneElementType = keyof typeof SCENE_ELEMENTS;
