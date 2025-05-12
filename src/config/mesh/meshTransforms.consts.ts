import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../material/shaders/build-shader/constants/shader.consts";
import { MeshTransformConfig } from "../../types";
import { MESH_TRANSFORM_TYPE } from "../../consts/mesh.consts";

export const DEFAULT_MORPH_ATTRIBUTE_CONFIG = [
  {
    id: "pointIndex",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "randomAngle",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "randomBool",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "randomBool2",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
];

export const QUAD_MESH_TRANSFORM_ATTRIBUTES = [
  {
    id: "quadDimensions",
    attributeValueType: ATTRIBUTE_VALUE_TYPES.SINGLE_VALUE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
    configLocked: true,
  },
  {
    id: "pointOffset",
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    assetId: "",
  },
];

export const QUAD_MESH_TRANSFORM = {
  id: "quadMeshTransform",
  type: MESH_TRANSFORM_TYPE.SET_UP_QUAD,
  transformedMeshIds: [],
  materialId: "",
  attributeConfigs: [...QUAD_MESH_TRANSFORM_ATTRIBUTES],
} as MeshTransformConfig;
