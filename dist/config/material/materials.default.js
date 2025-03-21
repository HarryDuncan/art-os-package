"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MATERIAL = exports.DEFAULT_MATERIAL_CONFIG = void 0;
const three_1 = require("three");
exports.DEFAULT_MATERIAL_CONFIG = {
    id: "default-material",
    materialParams: {
        color: "#111111",
        specular: "#bfbfbf",
        shininess: 50,
    },
    materialType: "PHONG",
};
exports.DEFAULT_MATERIAL = new three_1.MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
});
