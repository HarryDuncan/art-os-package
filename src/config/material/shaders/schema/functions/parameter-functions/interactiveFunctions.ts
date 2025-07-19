import { SHADER_PROPERTY_VALUE_TYPES } from "../../consts";
import {
  AFFECTED_AREA_DISTANCE,
  AFFECTED_POSITION,
  VERTEX_POINT,
} from "../../parameters";

export const IS_POSITION_AFFECTED = {
  id: "isPositionAffected",
  name: "Is Position Affected",
  description: "Check if a position is affected by an interactive source",
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
