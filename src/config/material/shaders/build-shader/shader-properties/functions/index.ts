import { IS_POSITION_AFFECTED } from "./interactiveFunctions";
import { GET_TEXTURE_POINT_COLOR } from "./textureFunctions";

export const FUNCTIONS = {
  GET_TEXTURE_POINT_COLOR: "getTexturePointColor",
  IS_POSITION_AFFECTED: "isPositionAffected",
};
export const FUNCTIONS_SCHEMA_MAP = {
  [FUNCTIONS.GET_TEXTURE_POINT_COLOR]: GET_TEXTURE_POINT_COLOR,
  [FUNCTIONS.IS_POSITION_AFFECTED]: IS_POSITION_AFFECTED,
};

export * from "./getFunctionCode";
