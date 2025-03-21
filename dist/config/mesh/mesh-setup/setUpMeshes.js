import { Mesh, Points } from "three";
import { MESH_TYPES, } from "../../../assets/geometry/geometry.types";
export const setUpMeshes = (meshConfigs = []) => meshConfigs.flatMap(({ geometry, name, material, meshType, position, rotation, groupId }, index) => {
    const mesh = getMesh(geometry, material, meshType);
    if (!mesh)
        return [];
    formatMesh(mesh, name !== null && name !== void 0 ? name : `mesh-${index}`, position, rotation, groupId);
    return mesh;
});
const getMesh = (geometry, material, meshType = MESH_TYPES.MESH) => {
    switch (meshType) {
        case MESH_TYPES.NONE: {
            return null;
        }
        case MESH_TYPES.POINTS: {
            return new Points(geometry, material);
        }
        case MESH_TYPES.MESH:
        default:
            return new Mesh(geometry, material);
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
