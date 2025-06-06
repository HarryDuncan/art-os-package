import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../material/shaders/build-shader/constants/shader.consts";
import { MeshTransformConfig } from "../../types";
import { MESH_TRANSFORM_TYPE } from "./mesh.consts";

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
    name: "Quad Dimensions",
    description: "The dimensions of the quad mesh",
    configLocked: true,
    isAttribute: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    isAssetMapped: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
    },
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.SINGLE_VALUE,
      assetId: "",
    },
  },
  {
    id: "pointOffset",
    name: "Point Offset",
    description: "The offset of each point in the mesh",
    configLocked: true,
    isAttribute: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
      assetId: "",
    },
  },
];

export const QUAD_MESH_TRANSFORM = {
  id: "quadMeshTransform",
  type: MESH_TRANSFORM_TYPE.SET_UP_QUAD,
  transformedMeshIds: [],
  materialId: "",
  attributeConfigs: [...QUAD_MESH_TRANSFORM_ATTRIBUTES],
} as unknown as MeshTransformConfig;
