import {
  FRAG_COLOR_NAME,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../../../../../consts";
import { UniformConfig } from "../../../../../../../../types/materials";
import { parseRawValueToShader } from "../../../../helpers/safeParseValue";

export const getPointTexture = (uniforms: UniformConfig[]) => {
  const pointTextureUniforms = uniforms.filter(
    ({ id }) => id.indexOf("PointTexture") !== -1 && id.indexOf("Color") === -1
  );

  const colorUniforms = uniforms
    .filter(({ id }) => id.indexOf("PointTextureColor") !== -1)
    .flatMap(({ value }) =>
      value
        ? parseRawValueToShader(SHADER_PROPERTY_VALUE_TYPES.VEC4, value)
        : []
    );

  // const pointColor = "#ffffff";
  const increment = 1 / pointTextureUniforms.length;
  return pointTextureUniforms.map(({ id }, index) => {
    const lowerBound = (index * increment).toFixed(1);
    const upperBound = ((index + 1) * increment).toFixed(1);
    return `if(vPointType > ${lowerBound} && vPointType < ${
      upperBound === "1.0" ? "1.1" : upperBound
    }){
              vec4 textureColor =  texture2D(${id}, gl_PointCoord);
              ${FRAG_COLOR_NAME} = ${formatPointColor(
      colorUniforms[index]
    )} * textureColor ;
      
          } \n `;
  });
};

const formatPointColor = (pointColor?: string) => {
  if (pointColor) {
    return pointColor;
  }
  return `vec4(${FRAG_COLOR_NAME}.rgb, 1.0)`;
};
