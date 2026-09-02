import { Material, Texture } from "three";

import {
  EffectConfig,
  ParameterConfig,
  OperatorConfig,
  ShaderTransformationSchema,
} from "./shaders/schema";
import { ENV_MAP_TYPES, MATERIAL_TYPES } from "./schema";

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
  specular: string;
  emissive: string;
  shininess: number;
  opacity: number;
};
export type MaterialConfigProps =
  | MatcapMaterialProps
  | ShaderMaterialProps
  | VideoMaterialProps
  | EnvMapMaterialProps
  | PhongMaterialProps;

export type ExternalSchema = {
  shaderFunction: Record<string, ShaderTransformationSchema[]>;
  fragment: Record<string, ShaderTransformationSchema[]>;
  vertex: Record<string, ShaderTransformationSchema[]>;
  animationLoop: Record<string, ShaderTransformationSchema[]>;
};

export interface MaterialConfig {
  guid: string;
  name: string;

  materialType: MaterialType;
  materialProps: MaterialConfigProps;

  operatorConfigs?: OperatorConfig[];
  parameterConfigs?: ParameterConfig[];
  shaderEffectConfigs?: EffectConfig[];
  functionConfigs?: EffectConfig[];
  animationLoopConfigs?: EffectConfig[];

  assetMapping?: AssetToUniformMappingConfig[];
  blendingConfig?: Record<string, unknown>;
  schemas?: ExternalSchema;

  // ART-OS stuff
  meshType?: string;
  description?: string;
  tags?: string[];
  isTemplate?: boolean;
}

export type ShaderMaterial = Material & {
  uniforms: Record<string, UniformValue>;
  name: string;
};
export type MaterialUniform = Record<string, UniformValue>;
export type UniformValue = Record<"value", unknown>;

export type AssetToUniformMappingConfig = {
  uniformId: string;
  assetId: string;
  relationship: string;
};

/** Sequential link between two shader effects inside an effect group. */
export type EffectGroupRelation = {
  sourceGuid: string;
  targetGuid: string;
};

/**
 * Reusable subgraph of shader effects / functions / animation loops / operators / parameters.
 * Stored as a standalone library config; reminted when inserted into a material.
 */
export type EffectGroupConfig = {
  guid: string;
  name: string;
  description?: string;
  /** Vertex + fragment effects in processing order. */
  shaderEffectConfigs: EffectConfig[];
  functionConfigs: EffectConfig[];
  animationLoopConfigs: EffectConfig[];
  operatorConfigs?: OperatorConfig[];
  /**
   * Parameters in the group: selected single-parameter nodes plus those
   * referenced by effect/function/loop/operator mappings.
   * Asset-mapped parameters have `value` cleared (and assetId blanked).
   */
  parameterConfigs: ParameterConfig[];
  effectRelations: EffectGroupRelation[];
  /** Baked schemas so the group can plug into a material offline. */
  schemas?: ExternalSchema;
  createdAt?: string;
  updatedAt?: string;
};
