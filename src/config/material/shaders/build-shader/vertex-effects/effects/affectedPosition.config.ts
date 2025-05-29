import { Vector3 } from "three";
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
    value: new Vector3(0.0, 0.0, 0.0),
    configLocked: true,
    interactionConfig: {
      keyPointId: null,
    },
  },
] as ParameterConfig[];

export const AFFECTED_POSITION_ATTRIBUTES = [];

export const affectedPositionTransformConfig = [
  {
    id: "affectedPosition",
    effectCode: [
      `vec3 effectDistanceVector =  vec3({{uAffectedPosition}}.xy, 0.0) - vec3({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xy, 0.0);`,
      `float effectDistanceLength = length(effectDistanceVector);`,
      `if(effectDistanceLength <= {{uAffectedAreaDistance}} ){`,
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
