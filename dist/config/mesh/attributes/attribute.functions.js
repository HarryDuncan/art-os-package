export const getVerticesCount = (geometry) => { var _a, _b; return (_b = (_a = geometry.getAttribute("position")) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0; };
export const getPositionsLength = (geometry) => geometry.getAttribute("position").array.length;
export const getVertices = (geometry) => geometry.getAttribute("position").array;
export const getNormals = (geometry) => geometry.getAttribute("normal").array;
export const getVertexArray = (geometry) => {
    const vertices = getVertices(geometry);
    return Array.from(vertices);
};
export const getUVs = (geometry) => geometry.getAttribute("uv");
export const getGeometryAttributes = (geometry) => {
    const uvs = getUVs(geometry);
    const normals = getNormals(geometry);
    const vertices = getVertices(geometry);
    return { uvs, normals, vertices };
};
export const getAttributes = (geometry) => geometry.attributes;
