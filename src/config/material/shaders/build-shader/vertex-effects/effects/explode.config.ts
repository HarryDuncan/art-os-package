import { MeshTransformConfig } from "../../../../../../types/config.types";
import {
  ShaderFunction,
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../../../../types/materials/index";
import { MESH_TRANSFORM_TYPE } from "../../../../../mesh/mesh.consts";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];
export const EXPLODE_ATTRIBUTES = [
  {
    id: "randomAngle",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    isAttribute: true,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
    },
  },
  {
    id: "signDirection",
    name: "Sign Direction",
    description: "The direction of the explode effect",
    isAttribute: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
    },
  },
] as ParameterConfig[];

// export const EXPLODE_VARYINGS = [
//   { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
// ] as VaryingConfig[];

export const EXPLODE_PARAMETERS = [
  {
    id: "uStrength",
    name: "Strength",
    description: "The strength of the explode effect",
    valueType: "FLOAT",
    value: 1.5,
    configLocked: true,
  },
] as ParameterConfig[];

const EXPLODE_MESH_TRANSFORM = {
  id: "explodeMeshTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [...EXPLODE_ATTRIBUTES],
} as unknown as MeshTransformConfig;

const EXPLODE_TRANSFORMATION_CONFIG = {
  id: "explodeTransformation",
  transformCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.x +=  cos({{randomAngle}} * uTime) * {{uStrength}} ;`,
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.y +=  sin({{randomAngle}} * uTime) * {{uStrength}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
} as unknown as ShaderTransformationConfig;

export const EXPLODE_EFFECT_CONFIG = {
  functions: EXPLODE_FUNCTIONS,
  meshTransformConfig: [EXPLODE_MESH_TRANSFORM],
  parameters: EXPLODE_PARAMETERS,
  transformationConfig: [EXPLODE_TRANSFORMATION_CONFIG],
};
