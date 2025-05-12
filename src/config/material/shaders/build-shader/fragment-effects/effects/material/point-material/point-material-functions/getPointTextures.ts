import { createColorVectorString } from "../../../../../helpers/createColorVectorString";
import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";
import { UniformValueConfig } from "../../../../../../../../../types/materials";

export const getPointTexture = (uniforms: UniformValueConfig[]) => {
  const pointTextureUniforms = uniforms.filter(
    ({ id }) => id.indexOf("PointTexture") !== -1
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
              ${FRAG_COLOR_NAME} = ${formatPointColor()} * textureColor ;
      
          } \n `;
  });
};

const formatPointColor = (pointColor?: string) => {
  if (pointColor) {
    return `${createColorVectorString(pointColor, true)}`;
  }
  return `vec4(${FRAG_COLOR_NAME}.rgb, opacity)`;
};
