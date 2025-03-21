"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpMeshes = void 0;
const three_1 = require("three");
const geometry_types_1 = require("../../../assets/geometry/geometry.types");
const setUpMeshes = (meshConfigs = []) => meshConfigs.flatMap(({ geometry, name, material, meshType, position, rotation, groupId }, index) => {
    const mesh = getMesh(geometry, material, meshType);
    if (!mesh)
        return [];
    formatMesh(mesh, name !== null && name !== void 0 ? name : `mesh-${index}`, position, rotation, groupId);
    return mesh;
});
exports.setUpMeshes = setUpMeshes;
const getMesh = (geometry, material, meshType = geometry_types_1.MESH_TYPES.MESH) => {
    switch (meshType) {
        case geometry_types_1.MESH_TYPES.NONE: {
            return null;
        }
        case geometry_types_1.MESH_TYPES.POINTS: {
            return new three_1.Points(geometry, material);
        }
        case geometry_types_1.MESH_TYPES.MESH:
        default:
            return new three_1.Mesh(geometry, material);
    }
};
const formatMesh = (mesh, name, position, rotation, groupId) => {
    mesh.name = name;
    mesh.groupId = groupId;
    if (position) {
        const { x, y, z } = position;
        mesh.position.set(x, y, z);
    }
    if (rotation) {
        const { x, y, z } = rotation;
        mesh.rotation.set(x, y, z);
    }
};
