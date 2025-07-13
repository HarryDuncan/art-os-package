import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants";
import { VERTEX_POINT } from "../parameters";
import {
  AFFECTED_AREA_DISTANCE,
  AFFECTED_POSITION,
} from "../parameters/schema/interactiveParameters";

export const IS_POSITION_AFFECTED = {
  id: "isPositionAffected",
  transformCode: [
    `vec2 effectDistanceVector =  vec2({{pointPosition}}.xy) - vec2({{affectedPosition}}.xy);`,
    `float effectDistanceLength = length(effectDistanceVector);`,
    `if(effectDistanceLength <= {{affectedAreaDistance}} ){`,
    `return 1.0;`,
    `}`,
    `return  0.0;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  inputSchema: [VERTEX_POINT, AFFECTED_POSITION, AFFECTED_AREA_DISTANCE],
};
