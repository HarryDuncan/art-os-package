import { Mesh, PlaneGeometry } from "three";
import { DEFAULT_MATERIAL } from "../../config/material/materials.default";
export const PlaneElement = ({ id, size, position, material = DEFAULT_MATERIAL, }) => {
    var _a, _b;
    const planeGeometry = new PlaneGeometry((_a = size === null || size === void 0 ? void 0 : size.x) !== null && _a !== void 0 ? _a : 100, (_b = size === null || size === void 0 ? void 0 : size.y) !== null && _b !== void 0 ? _b : 60);
    const plane = new Mesh(planeGeometry, material);
    plane.name = id;
    const { x, y, z } = position;
    plane.position.set(x, y, z);
    return plane;
};
