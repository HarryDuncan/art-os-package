import { MeshPhongMaterial } from "three";
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
