"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_MAP_TYPES = exports.ASSET_MAPPED_MATERIALS = exports.SHADER_MATERIALS = exports.MATERIAL_TYPES = void 0;
exports.MATERIAL_TYPES = {
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
exports.SHADER_MATERIALS = [
    exports.MATERIAL_TYPES.SHADER,
    exports.MATERIAL_TYPES.INTERACTIVE_SHADER,
];
exports.ASSET_MAPPED_MATERIALS = [
    exports.MATERIAL_TYPES.ENV_MAP,
    exports.MATERIAL_TYPES.MATCAP,
    exports.MATERIAL_TYPES.VIDEO,
];
exports.ENV_MAP_TYPES = {
    REFLECTION: "REFLECTION",
    REFRACTION: "REFRACTION",
};
