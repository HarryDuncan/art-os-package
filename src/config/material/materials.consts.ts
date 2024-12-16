export const MATERIAL_TYPES = {
  INTERACTIVE_SHADER: "INTERACTIVE_SHADER",
  SHADER: "SHADER",
  MATCAP: "MATCAP",
  VIDEO: "VIDEO",
  ENV_MAP: "ENV_MAP",
  STANDARD: "STANDARD",
  PHONG: "PHONG",
  MATERIAL: "MATERIAL",
  BUILT_SHADER: "BUILT_SHADER",
};

export const SHADER_MATERIALS = [
  MATERIAL_TYPES.SHADER,
  MATERIAL_TYPES.INTERACTIVE_SHADER,
];

export const ASSET_MAPPED_MATERIALS = [
  MATERIAL_TYPES.ENV_MAP,
  MATERIAL_TYPES.MATCAP,
  MATERIAL_TYPES.VIDEO,
];

export const ENV_MAP_TYPES = {
  REFLECTION: "REFLECTION",
  REFRACTION: "REFRACTION",
};