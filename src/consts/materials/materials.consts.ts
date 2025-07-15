import { MeshPhongMaterial } from "three";

export const MATERIAL_TYPES = {
  BUILT_SHADER: "BUILT_SHADER",
  MATCAP: "MATCAP",
  VIDEO: "VIDEO",
  ENV_MAP: "ENV_MAP",
  STANDARD: "STANDARD",
  PHONG: "PHONG",
};

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

export const DEFAULT_MATERIAL = new MeshPhongMaterial({
  specular: 0x111111,
  shininess: 250,
});

export const DEFAULT_PHONG_PROPS = {
  color: "#111111",
  emissive: "#bfbfbf",
  specular: "#bfbfbf",
  shininess: 50,
  opacity: 1,
};
