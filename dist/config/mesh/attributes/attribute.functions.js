"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributes = exports.getGeometryAttributes = exports.getUVs = exports.getVertexArray = exports.getNormals = exports.getVertices = exports.getPositionsLength = exports.getVerticesCount = void 0;
const getVerticesCount = (geometry) => { var _a, _b; return (_b = (_a = geometry.getAttribute("position")) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0; };
exports.getVerticesCount = getVerticesCount;
const getPositionsLength = (geometry) => geometry.getAttribute("position").array.length;
exports.getPositionsLength = getPositionsLength;
const getVertices = (geometry) => geometry.getAttribute("position").array;
exports.getVertices = getVertices;
const getNormals = (geometry) => geometry.getAttribute("normal").array;
exports.getNormals = getNormals;
const getVertexArray = (geometry) => {
    const vertices = (0, exports.getVertices)(geometry);
    return Array.from(vertices);
};
exports.getVertexArray = getVertexArray;
const getUVs = (geometry) => geometry.getAttribute("uv");
exports.getUVs = getUVs;
const getGeometryAttributes = (geometry) => {
    const uvs = (0, exports.getUVs)(geometry);
    const normals = (0, exports.getNormals)(geometry);
    const vertices = (0, exports.getVertices)(geometry);
    return { uvs, normals, vertices };
};
exports.getGeometryAttributes = getGeometryAttributes;
const getAttributes = (geometry) => geometry.attributes;
exports.getAttributes = getAttributes;
