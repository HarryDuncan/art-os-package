import { Material } from "three";
import { SceneComponentConfig } from "../config.types";
export declare const addMaterialsToComponents: (componentConfigs: SceneComponentConfig[], materials: Material[]) => {
    componentProps: {
        material: Material;
        resolution?: number;
        isolation?: number;
        scale?: number;
        position: Vector3;
    } | {
        material: Material;
        text: string;
        fontUrl: string;
        position: Vector3;
    } | {
        material: Material;
        geometry: BufferGeometry;
        color?: ColorRepresentation;
        position: Vector3;
    } | {
        material: Material;
        rotation?: Vector3;
        radius: number;
        position: Vector3;
    } | {
        material: Material;
        size?: Vector3;
        position: Vector3;
    };
    id: string;
    componentType: "MARCHING_CUBES" | "TEXT" | "MIRROR" | "PLANE" | "CUBE" | "SHADER_BACKGROUND" | "SPHERICAL_BACKGROUND";
    materialId?: string;
}[];
