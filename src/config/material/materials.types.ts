import { Material, Texture } from "three";
import { BuiltShaderConfig } from "./shaders/build-shader/types";
import { ENV_MAP_TYPES, MATERIAL_TYPES } from "./../../consts/materials.consts";

export type MaterialType = keyof typeof MATERIAL_TYPES;
export type EnvMapType = keyof typeof ENV_MAP_TYPES;

export interface MaterialProps {
  name?: string;
  assetId?: string;
}
export type StandardMaterialProps = MaterialProps & {
  color: string;
  metalness: number;
  roughness: number;
  envMapIntensity: number;
  displacementScale: number;
  normalScale: number;
};
export interface ShaderConfig {
  shaderId: string;
  assetMapping?: AssetToUniformMappingConfig[];
  fragmentShaderId?: string;
  vertexShaderId?: string;
}

export type ShaderMaterialProps = MaterialProps & {
  shaderConfig: ShaderConfig;
  uniforms: MaterialUniform;
};

export type MatcapMaterialProps = MaterialProps & {
  matcap: Texture | null;
};

export type EnvMapMaterialProps = MaterialProps & {
  envMapType: EnvMapType;
  imageUrl: string;
};

export type VideoMaterialProps = MaterialProps & {
  videoId: string;
};
export type PhongMaterialProps = MaterialProps & {
  color: string;
  specular?: number;
  shininess: number;
};
export type MaterialConfigProps =
  | MatcapMaterialProps
  | ShaderMaterialProps
  | VideoMaterialProps
  | EnvMapMaterialProps;

export interface MaterialConfig {
  id: string;
  materialType: MaterialType;
  materialProps: MaterialConfigProps;
  builtShaderConfig?: BuiltShaderConfig;
  assetMapping?: AssetToUniformMappingConfig[];
  blendingConfig?: Record<string, unknown>;
}

export type ShaderMaterial = Material & {
  uniforms: Record<string, UniformValue>;
  name: string;
};
export type MaterialUniform = Record<string, UniformValue>;
export type UniformValue = Record<"value", unknown>;

export type AssetToUniformMappingConfig = {
  uniform: string;
  assetId: string;
  relationship: string;
};
