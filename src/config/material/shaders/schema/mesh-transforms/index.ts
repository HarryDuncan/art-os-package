import { SHADER_PROPERTY_TYPES, SHADER_PROPERTY_VALUE_TYPES } from "../consts";
import { POINT_OFFSET, QUAD_DIMENSION } from "../parameters";

export const QUAD_MESH_TRANSFORM_ID = "quadMeshTransform";
export const PLANE_MESH_TRANSFORM_ID = "planeMeshTransform";

export const MESH_TRANSFORM_TYPES = {
  MORPH: "MORPH",
  CUSTOM_ATTRIBUTES: "CUSTOM_ATTRIBUTES",
  SET_UP_QUAD: "SET_UP_QUAD",
  SET_UP_PLANE: "SET_UP_PLANE",
  SINGLE_PARAMETERS: "SINGLE_PARAMETERS",
};

export const MESH_TRANSFORM_IDS = {
  QUAD: QUAD_MESH_TRANSFORM_ID,
  PLANE: PLANE_MESH_TRANSFORM_ID,
};

export const QUAD_MESH_TRANSFORM = {
  id: QUAD_MESH_TRANSFORM_ID,
  type: MESH_TRANSFORM_TYPES.SET_UP_QUAD,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [QUAD_DIMENSION, POINT_OFFSET],
};

export const QUAD_DIMENSION_CONSTANT = {
  key: "quadDimensions",
  name: "Quad Dimensions",
  description: "The dimensions of the quad mesh",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  parameterType: SHADER_PROPERTY_TYPES.MESH_TRANSFORM_VALUE,
};

export const PLANE_MESH_TRANSFORM = {
  id: PLANE_MESH_TRANSFORM_ID,
  type: MESH_TRANSFORM_TYPES.SET_UP_PLANE,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [QUAD_DIMENSION, POINT_OFFSET],
};

export const MESH_TRANSFORM_SCHEMA = {
  [MESH_TRANSFORM_TYPES.SET_UP_QUAD]: QUAD_MESH_TRANSFORM,
  [MESH_TRANSFORM_TYPES.SET_UP_PLANE]: PLANE_MESH_TRANSFORM,
};
