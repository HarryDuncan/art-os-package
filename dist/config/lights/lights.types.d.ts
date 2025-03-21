import { AmbientLight, DirectionalLight, PointLight, Vector3 } from "three";
export declare const LIGHT_TYPES: {
    AMBIENT: string;
    POINT_LIGHT: string;
    DIRECTIONAL_LIGHT: string;
};
export type LightType = keyof typeof LIGHT_TYPES;
export interface LightConfigProperties {
    color?: string;
    position?: Vector3;
    intensity?: number;
}
export type AmbientLightConfig = LightConfigProperties;
export type PointLightConfig = LightConfigProperties;
export type DirectionalLightConfig = LightConfigProperties;
export type LightParameters = AmbientLightConfig | DirectionalLightConfig | PointLightConfig;
export interface LightConfigs {
    name: string;
    lightType: LightType;
    props?: LightParameters;
}
export type SceneLight = AmbientLight | PointLight | DirectionalLight;
