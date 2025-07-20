import { SHADER_PROPERTY_VALUE_TYPES } from "../../consts";
import {
  CONVERTED_TEXTURE,
  TEXTURE_SIZE,
  VERTEX_POINT,
} from "../../parameters";

export const GET_TEXTURE_POINT_COLOR = {
  key: "getTexturePointColor",
  name: "Get Texture Point Color",
  description: "Get the color of a texture at a point",
  transformCode: [
    `vec2 puv = {{pointPosition}}.xy / {{textureSize}};`,
    `vec4 color = texture2D({{convertedTexture}}, puv);`,
    `return color;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  inputSchema: [VERTEX_POINT, TEXTURE_SIZE, CONVERTED_TEXTURE],
};
