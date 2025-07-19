import { MESH_TRANSFORM_IDS } from "../../mesh-transforms";
import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { UV } from "../../parameters";

const PLANE_SIZE = {
  key: "planeSize",
  name: "Plane Size",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  value: null,
  description: "The size of the plane",
};

const PLANE_FROM_IMAGE_PARAMETERS = [UV, PLANE_SIZE];
export const PLANE_FROM_DIMENSION_EFFECT_CONFIG = {
  functions: [],
  meshTransformIds: [MESH_TRANSFORM_IDS.PLANE],
  parameters: PLANE_FROM_IMAGE_PARAMETERS,
  transformSchema: [
    {
      id: "pointPlane",
      transformCode: [
        `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xy -= {{planeSize}} * 0.5;`,
        `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
      ],
      returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
      assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
    },
  ],
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
};
