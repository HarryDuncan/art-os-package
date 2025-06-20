import {
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import { MeshTransformConfig } from "../../../../../../types/config.types";
import { MESH_TRANSFORM_TYPE } from "../../../../../mesh/mesh.consts";

export const AFFECTED_POSITION_PARAMETERS = [
  {
    id: "uAffectedAreaDistance",
    valueType: "FLOAT",
    value: 1.5,
    configLocked: true,
  },
  {
    id: "uAffectedPosition",
    name: "Affected Position",
    description: "The position of the affected area",
    valueType: "VEC3",
    isUniform: true,
    isInteractive: true,
    value: [0.0, 0.0, 0.0],
    configLocked: true,
    interactionConfig: {
      keyPointId: null,
    },
  },
] as ParameterConfig[];

export const AFFECTED_POSITION_ATTRIBUTES = [];

export const affectedPositionTransformConfig = [
  {
    id: "isPositionAffected",
    effectCode: [
      `vec2 effectDistanceVector =  vec2({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xy) - vec2({{uAffectedPosition}}.xy);`,
      `float effectDistanceLength = length(effectDistanceVector);`,
      `if(effectDistanceLength <= {{uAffectedAreaDistance}} ){`,
      `return 1.0;`,
      `}`,
      `return  0.0;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "affectedPositionTransform",
    effectCode: [
      `float isAffected = {{isPositionAffected}};`,
      `if(isAffected == 1.0 ){`,
      `{{SUB_EFFECTS}}`,
      `}`,
      `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
] as unknown as ShaderTransformationConfig[];

const AFFECTED_POSITION_MESH_TRANSFORM = {
  id: "affectedPositionMeshTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  attributeConfigs: [...AFFECTED_POSITION_ATTRIBUTES],
} as unknown as MeshTransformConfig;

export const AFFECTED_POSITION_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [AFFECTED_POSITION_MESH_TRANSFORM],
  parameters: AFFECTED_POSITION_PARAMETERS,
  transformationConfig: affectedPositionTransformConfig,
};
