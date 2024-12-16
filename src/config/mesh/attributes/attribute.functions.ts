import { BufferGeometry } from "three";

export const getVerticesCount = (geometry: BufferGeometry) =>
  geometry.getAttribute("position")?.count ?? 0;

export const getPositionsLength = (geometry: BufferGeometry) =>
  geometry.getAttribute("position").array.length;

export const getVertices = (geometry: BufferGeometry) =>
  geometry.getAttribute("position").array;

export const getNormals = (geometry: BufferGeometry) =>
  geometry.getAttribute("normal");

export const getVertexArray = (geometry: BufferGeometry): number[] => {
  const vertices = getVertices(geometry);
  return Array.from(vertices);
};
export const getUVs = (geometry: BufferGeometry) => geometry.getAttribute("uv");

export const getGeometryAttributes = (geometry: BufferGeometry) => {
  const uvs = getUVs(geometry);
  const normals = getNormals(geometry);
  const vertices = getVertices(geometry);
  return { uvs, normals, vertices };
};

export const getAttributes = (geometry: BufferGeometry) => geometry.attributes;
