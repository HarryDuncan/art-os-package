import { SHADER_PROPERTY_VALUE_TYPES } from "../../consts";
import {
  CONVERTED_TEXTURE,
  TEXTURE_SIZE,
  VERTEX_POINT,
} from "../../parameters";

export const GET_TEXTURE_POINT_COLOR = {
  id: "getTexturePointColor",
  transformCode: [
    `vec2 puv = {{pointPosition}}.xy / {{textureSize}};`,
    `vec4 color = texture2D({{convertedTexture}}, puv);`,
    `return color;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  inputSchema: [VERTEX_POINT, TEXTURE_SIZE, CONVERTED_TEXTURE],
};
