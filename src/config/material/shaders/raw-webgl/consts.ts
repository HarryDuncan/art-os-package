import { CUSTOM_BUFFER_GEOMETRY_TYPES, MESH_TYPES } from "../../../mesh/consts";
import { RawWebglClearColor } from "./types";

// Defaults for plane meshes rendered by the `webgl` engine. Editors should
// seed new meshes from these so authored configs match what the runtime
// assumes for missing fields.
export const RAW_WEBGL_DEFAULTS = {
  geometryType: CUSTOM_BUFFER_GEOMETRY_TYPES.DETAILED_PLANE,
  meshType: MESH_TYPES.MESH,
  planeWidth: 128,
  planeHeight: 128,
  scale: 1,
  centerGeometryToOrigin: true,
  clearColor: [0, 0, 0, 0] as RawWebglClearColor,
  // Legacy fullscreen plane (no plane meshes configured).
  legacyPlaneSegments: 128,
  legacyDrawMode: MESH_TYPES.POINTS,
  // Above this a single plane is likely to drop frames on low-power GPUs.
  recommendedMaxVerticesPerMesh: 1_000_000,
};

export const RAW_WEBGL_PLANE_GEOMETRY_TYPES = [
  CUSTOM_BUFFER_GEOMETRY_TYPES.SIMPLE_PLANE,
  CUSTOM_BUFFER_GEOMETRY_TYPES.DETAILED_PLANE,
];

export const RAW_WEBGL_MESH_TYPES = [MESH_TYPES.MESH, MESH_TYPES.POINTS];
