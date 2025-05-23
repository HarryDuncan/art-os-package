import { vertexTranslate } from "./translate";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const vertexTranslateFunction = {
  id: "translateVertex",
  functionDefinition: vertexTranslate,
  functionType: FUNCTION_TYPES.STATIC,
};
