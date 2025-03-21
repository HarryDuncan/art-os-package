"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpCustomBufferGeometry = void 0;
const three_1 = require("three");
const mesh_consts_1 = require("../../mesh.consts");
const setUpCustomBufferGeometry = (bufferGeometryType, _bufferGeometryConfig) => {
    switch (bufferGeometryType) {
        case mesh_consts_1.CUSTOM_BUFFER_GEOMETRY_TYPES.QUAD:
            return setUpQuad();
        case mesh_consts_1.CUSTOM_BUFFER_GEOMETRY_TYPES.EMPTY:
            return emptyBuffer();
        default:
            console.warn(`No custom buffer geometry has been set for ${bufferGeometryType}`);
    }
};
exports.setUpCustomBufferGeometry = setUpCustomBufferGeometry;
const setUpQuad = () => {
    const bufferGeometry = new three_1.BufferGeometry();
    // positions
    const positions = new three_1.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -1, 1, 0.0);
    positions.setXYZ(1, 1, 1, 0.0);
    positions.setXYZ(2, -1, -1, 0.0);
    positions.setXYZ(3, 1, -1, 0.0);
    bufferGeometry.setAttribute("position", positions);
    // uvs
    const uvs = new three_1.BufferAttribute(new Float32Array(4 * 2), 2);
    // @ts-ignore
    uvs.setXYZ(0, 0.0, 0.0);
    // @ts-ignore
    uvs.setXYZ(1, 1.0, 0.0);
    // @ts-ignore
    uvs.setXYZ(2, 0.0, 1.0);
    // @ts-ignore
    uvs.setXYZ(3, 1.0, 1.0);
    bufferGeometry.setAttribute("uv", uvs);
    // index
    bufferGeometry.setIndex(new three_1.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
    return bufferGeometry;
};
const emptyBuffer = () => {
    const bufferGeometry = new three_1.BufferGeometry();
    return bufferGeometry;
};
