import { GET_TEXTURE_POINT_COLOR } from "./textureFunctions";

export const FUNCTIONS = {
  GET_TEXTURE_POINT_COLOR: "getTexturePointColor",
};
export const FUNCTIONS_SCHEMA_MAP = {
  [FUNCTIONS.GET_TEXTURE_POINT_COLOR]: GET_TEXTURE_POINT_COLOR,
};

export * from "./getFunctionCode";
