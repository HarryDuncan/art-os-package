import { MeshPhongMaterial } from "three";

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

// DEFAULTS

export const DEFAULT_MATERIAL_CONFIG = {
  id: "default-material",
  materialParams: {
    color: "#111111",
    specular: "#bfbfbf",
    shininess: 50,
  },
  materialType: "PHONG",
};

export const DEFAULT_MATERIAL = new MeshPhongMaterial({
  specular: 0x111111,
  shininess: 250,
});
